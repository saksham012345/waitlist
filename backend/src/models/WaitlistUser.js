import { v4 as uuidv4 } from 'uuid';
import { getCollection, getCluster } from '../db.js';

class WaitlistUser {
  constructor(data) {
    this._id = data._id || uuidv4();
    this.name = data.name;
    this.email = data.email?.toLowerCase();
    this.phoneNumber = data.phoneNumber;
    this.city = data.city;
    this.role = data.role || 'traveler';
    this.referralCode = data.referralCode;
    this.referredBy = data.referredBy || null;
    this.referralCount = data.referralCount || 0;
    this.waitlistPosition = data.waitlistPosition;
    this.milestonesUnlocked = data.milestonesUnlocked || [];
    this.joinedAt = data.joinedAt || new Date().toISOString();
  }

  async save() {
    if (!this.referralCode) {
      const firstName = this.name.split(' ')[0].toUpperCase();
      const randomNum = Math.floor(10 + Math.random() * 90);
      this.referralCode = `TREK-${firstName}${randomNum}`;
    }

    if (!this.waitlistPosition) {
      const cluster = getCluster();
      // Only query if waitlistPosition is not set.
      try {
        const countResult = await cluster.query('SELECT COUNT(*) as count FROM `trektribe`.`_default`.`waitlist_users`');
        const count = countResult.rows[0].count;
        this.waitlistPosition = count + 1;
      } catch (err) {
        // Fallback or ignore if table doesn't exist yet
        this.waitlistPosition = 1;
      }
    }

    const collection = getCollection('waitlist_users');
    await collection.upsert(this.email, {
      _id: this._id,
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      city: this.city,
      role: this.role,
      referralCode: this.referralCode,
      referredBy: this.referredBy,
      referralCount: this.referralCount,
      waitlistPosition: this.waitlistPosition,
      milestonesUnlocked: this.milestonesUnlocked,
      joinedAt: this.joinedAt,
    });
  }

  static async findOne(query) {
    const cluster = getCluster();
    let queryString = 'SELECT waitlist_users.* FROM `trektribe`.`_default`.`waitlist_users` WHERE ';
    const params = {};
    if (query.email) {
      try {
        const collection = getCollection('waitlist_users');
        const result = await collection.get(query.email.toLowerCase());
        return new WaitlistUser(result.content);
      } catch (err) {
         if (err.message && err.message.includes('not found')) return null;
         queryString += 'email = $email';
         params.email = query.email.toLowerCase();
      }
    } else if (query.referralCode) {
      queryString += 'referralCode = $referralCode';
      params.referralCode = query.referralCode;
    } else {
      return null;
    }

    if (Object.keys(params).length > 0) {
      queryString += ' LIMIT 1';
      try {
          const result = await cluster.query(queryString, { parameters: params });
          if (result.rows.length > 0) {
            return new WaitlistUser(result.rows[0]);
          }
      } catch(err) {
          console.error(err);
          return null;
      }
    }
    return null;
  }

  static find() {
    return new WaitlistQueryBuilder();
  }
}

class WaitlistQueryBuilder {
  constructor() {
    this._sort = '';
    this._limit = null;
    this._select = 'waitlist_users.*';
  }

  sort(sortObj) {
    const keys = Object.keys(sortObj);
    if (keys.length > 0) {
      this._sort = 'ORDER BY ' + keys.map(k => `${k} ${sortObj[k] === -1 ? 'DESC' : 'ASC'}`).join(', ');
    }
    return this;
  }

  limit(limitVal) {
    this._limit = limitVal;
    return this;
  }

  select(selectStr) {
    this._select = selectStr.split(' ').join(', ');
    // Include _id to match Mongoose somewhat if requested.
    return this;
  }

  async exec() {
    const cluster = getCluster();
    let q = `SELECT ${this._select} FROM \`trektribe\`.\`_default\`.\`waitlist_users\``;
    if (this._sort) q += ` ${this._sort}`;
    if (this._limit) q += ` LIMIT ${this._limit}`;
    try {
        const result = await cluster.query(q);
        // Sometimes SELECT * returns nested object, sometimes flat. We handle both:
        return result.rows.map(row => {
           if (row.waitlist_users) return row.waitlist_users;
           return row;
        });
    } catch (err) {
        console.error("Couchbase Query error:", err);
        return [];
    }
  }

  then(resolve, reject) {
    return this.exec().then(resolve).catch(reject);
  }
}

export default WaitlistUser;

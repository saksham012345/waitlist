import { v4 as uuidv4 } from 'uuid';
import { getCollection, getCluster } from '../db.js';

class Trip {
  constructor(data) {
    this._id = data._id || uuidv4();
    this.title = data.title;
    this.image = data.image;
    this.duration = data.duration;
    this.price = data.price;
    this.rating = data.rating || 0;
    this.organizer = data.organizer || {};
    this.tag = data.tag || 'Adventure';
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  async save() {
    const collection = getCollection('trips');
    await collection.upsert(this._id, {
      _id: this._id,
      title: this.title,
      image: this.image,
      duration: this.duration,
      price: this.price,
      rating: this.rating,
      organizer: this.organizer,
      tag: this.tag,
      createdAt: this.createdAt,
    });
  }

  static find() {
    return new TripQueryBuilder();
  }
}

class TripQueryBuilder {
  constructor() {
    this._sort = '';
    this._limit = null;
    this._select = 'trips.*';
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
    return this;
  }

  async exec() {
    const cluster = getCluster();
    let q = `SELECT ${this._select} FROM \`trektribe\`.\`_default\`.\`trips\``;
    if (this._sort) q += ` ${this._sort}`;
    if (this._limit) q += ` LIMIT ${this._limit}`;
    try {
        const result = await cluster.query(q);
        return result.rows.map(row => {
           if (row.trips) return row.trips;
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

export default Trip;

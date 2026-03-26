import WaitlistUser from '../models/WaitlistUser.js';

export const joinWaitlist = async (req, res) => {
  try {
    const { name, email, phoneNumber, city, role, ref } = req.body;

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: 'Please enter a valid 10-digit Indian phone number' });
    }

    // Prevent duplicate email
    let user = await WaitlistUser.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already on waitlist' });
    }

    // Prevent duplicate phone number
    let phoneUser = await WaitlistUser.findOne({ phoneNumber });
    if (phoneUser) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }

    // Create new user
    user = new WaitlistUser({ name, email, phoneNumber, city, role, referredBy: ref || null });
    await user.save();

    // ── Referral pipeline ──────────────────────────────────────────
    if (ref) {
      const referrer = await WaitlistUser.findOne({ referralCode: ref });
      if (referrer) {
        referrer.referralCount += 1;

        // Milestone unlocks
        const MILESTONES = [3, 10, 25, 50, 75, 100];
        MILESTONES.forEach(m => {
          const key = `${m}_referrals`;
          if (referrer.referralCount >= m && !referrer.milestonesUnlocked.includes(key)) {
            referrer.milestonesUnlocked.push(key);
          }
        });

        await referrer.save();
      }
    }

    // ── Re-rank everyone by referral count (waitlistPosition) ──────
    // We do this asynchronously after the response so the user doesn't wait.
    setImmediate(() => reRankAll().catch(err => console.warn('Re-rank failed:', err)));

    res.status(201).json({
      message: 'Successfully joined waitlist',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
        waitlistPosition: user.waitlistPosition,
        referralCount: user.referralCount,
        milestonesUnlocked: user.milestonesUnlocked,
      }
    });

  } catch (error) {
    console.error('Waitlist Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Re-rank all users: sorted primarily by referralCount (desc),
 * then by joinedAt (asc — earlier joiners rank higher on ties).
 * Updates each user's waitlistPosition in Couchbase.
 */
async function reRankAll() {
  // WaitlistUser.find() returns WaitlistQueryBuilder — get all users
  const allUsers = await WaitlistUser.find()
    .sort({ referralCount: -1, joinedAt: 1 })
    .exec();

  // Assign positions in order and save only if changed
  const saves = allUsers.map((user, i) => {
    const newPos = i + 1;
    if (user.waitlistPosition !== newPos) {
      user.waitlistPosition = newPos;
      return new WaitlistUser(user).save();
    }
    return Promise.resolve();
  });

  await Promise.all(saves);
}

export const getLeaderboard = async (req, res) => {
  try {
    const topExplorers = await WaitlistUser.find()
      .sort({ referralCount: -1, joinedAt: 1 })
      .limit(20)
      .select('name city referralCount waitlistPosition')
      .exec();

    res.status(200).json(topExplorers);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const recentUsers = await WaitlistUser.find()
      .sort({ joinedAt: -1 })
      .limit(5)
      .select('name city joinedAt')
      .exec();

    const activity = recentUsers.map(user => {
      // Anonymise: "A*** from Mumbai" — don't reveal full name in a public feed
      const firstNameInitial = user.name ? user.name.charAt(0).toUpperCase() : '?';
      const maskedName = `${firstNameInitial}***`;
      const location = user.city ? ` from ${user.city}` : '';
      return {
        id: user._id,
        message: `${maskedName}${location} just joined the waitlist 🎉`,
        type: 'joined',
        timestamp: user.joinedAt
      };
    });

    res.status(200).json(activity);
  } catch (error) {
    console.error('Recent activity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

import express from 'express';
import { joinWaitlist, getLeaderboard, getRecentActivity } from '../controllers/waitlist.controller.js';
import WaitlistUser from '../models/WaitlistUser.js';
import jsonexport from 'jsonexport';

const router = express.Router();

// POST /api/waitlist - Join waitlist
router.post('/', joinWaitlist);

// GET /api/waitlist/leaderboard - Get top explorers
router.get('/leaderboard', getLeaderboard);

// GET /api/waitlist/recent - Get real recent activity
router.get('/recent', getRecentActivity);

// GET /api/waitlist/profile/:email - Get user's current status
router.get('/profile/:email', async (req, res) => {
  try {
    const user = await WaitlistUser.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      referralCount: user.referralCount,
      waitlistPosition: user.waitlistPosition,
      milestonesUnlocked: user.milestonesUnlocked,
      joinedAt: user.joinedAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// GET /api/waitlist/count - Total signups
router.get('/count', async (req, res) => {
  try {
    const total = await WaitlistUser.countDocuments();
    const organizers = await WaitlistUser.countDocuments({ role: 'organizer' });
    const travelers = await WaitlistUser.countDocuments({ role: 'traveler' });
    res.json({ count: total, organizers, travelers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching count' });
  }
});

// GET /api/waitlist/export/:role - Admin export CSV
router.get('/export/:role', async (req, res) => {
  try {
    const { role } = req.params;
    const users = await WaitlistUser.find({ role }).select('name email phoneNumber city referralCount joinedAt');

    if (users.length === 0) {
      return res.status(404).send('No users found for this role');
    }

    const csv = await jsonexport(users.map(u => u.toObject()));

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=trektribe_${role}s.csv`);
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting data' });
  }
});

export default router;

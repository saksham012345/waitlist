import Trip from '../models/Trip.js';

export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.status(200).json(trips);
  } catch (error) {
    console.error('Trips Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

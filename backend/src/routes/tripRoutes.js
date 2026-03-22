import express from 'express';
import { getTrips } from '../controllers/trip.controller.js';

const router = express.Router();

// GET /api/trips - List available trips
router.get('/', getTrips);

export default router;

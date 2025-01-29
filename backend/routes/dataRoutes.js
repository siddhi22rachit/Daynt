import express from 'express';
import {
  createData,
  getData,
  updateData,
  deleteData
} from '../controllers/dataController.js';

const router = express.Router();

// Route to create new data
router.post('/data', createData);

// Route to get all data
router.get('/data', getData);

// Route to update existing data by id
router.put('/data/:id', updateData);

// Route to delete data by id
router.delete('/data/:id', deleteData);

export default router;

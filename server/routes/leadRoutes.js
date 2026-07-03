const express = require('express');
const {
  getLeads,
  getLeadStats,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  addNote,
} = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/stats', getLeadStats);
router.route('/').get(getLeads).post(createLead);
router.route('/:id').get(getLeadById).put(updateLead).delete(deleteLead);
router.post('/:id/notes', addNote);

module.exports = router;

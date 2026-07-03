const Lead = require('../models/Lead');

const getLeads = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (req.user.role === 'agent') {
      filter.createdBy = req.user._id;
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const leads = await Lead.find(filter)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leads',
      error: error.message,
    });
  }
};

const getLeadStats = async (req, res) => {
  try {
    const matchStage =
      req.user.role === 'agent' ? { createdBy: req.user._id } : {};

    const stats = await Lead.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const total = await Lead.countDocuments(matchStage);

    const statusCounts = {
      New: 0,
      Contacted: 0,
      Qualified: 0,
      Closed: 0,
    };

    stats.forEach((item) => {
      statusCounts[item._id] = item.count;
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        byStatus: statusCounts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lead stats',
      error: error.message,
    });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('notes.addedBy', 'name');

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    if (
      req.user.role === 'agent' &&
      lead.createdBy._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this lead',
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lead',
      error: error.message,
    });
  }
};

const createLead = async (req, res) => {
  try {
    const { name, phone, email, businessType, status, source, assignedTo } =
      req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide lead name and phone number',
      });
    }

    const lead = await Lead.create({
      name,
      phone,
      email,
      businessType,
      status,
      source,
      assignedTo: assignedTo || req.user._id,
      createdBy: req.user._id,
    });

    const populatedLead = await Lead.findById(lead._id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: populatedLead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create lead',
      error: error.message,
    });
  }
};

const updateLead = async (req, res) => {
  try {
    let lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    if (
      req.user.role === 'agent' &&
      lead.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this lead',
      });
    }

    lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update lead',
      error: error.message,
    });
  }
};

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    if (
      req.user.role === 'agent' &&
      lead.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this lead',
      });
    }

    await lead.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete lead',
      error: error.message,
    });
  }
};

const addNote = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Please provide note text',
      });
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    if (
      req.user.role === 'agent' &&
      lead.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add notes to this lead',
      });
    }

    lead.notes.push({
      text,
      addedBy: req.user._id,
    });

    await lead.save();

    const updatedLead = await Lead.findById(lead._id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('notes.addedBy', 'name');

    res.status(201).json({
      success: true,
      message: 'Note added successfully',
      data: updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add note',
      error: error.message,
    });
  }
};

module.exports = {
  getLeads,
  getLeadStats,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  addNote,
};

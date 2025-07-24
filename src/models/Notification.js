const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  fromUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null // Optional: who triggered the notification
  },
  type: {
    type: String,
    enum: ['projectAssigned', 'message', 'alert', 'system', 'custom' ],
    required: true
  },
  category: {
    type: String,
    enum: ['project', 'chat', 'system', 'news' , 'report'],
    default: 'project'
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default: {} // For IDs or metadata (e.g. { projectId, commentId })
  },
  link: {
    type: String,
    default: '' // Where the user should be redirected
  },
  icon: {
    type: String,
    default: '' // Optional emoji or icon URL
  },
  seen: {
    type: Boolean,
    default: false
  },
  seenAt: {
    type: Date,
    default: null
  },
  deliveredAt: {
    type: Date,
    default: null
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'critical'],
    default: 'normal'
  },
  actionRequired: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'seen', 'archived'],
    default: 'pending'
  },
  expiresAt: {
    type: Date,
    default: null // For auto-expiring notifications
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ⚡ Index for fast retrieval
NotificationSchema.index({ userId: 1, seen: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', NotificationSchema);

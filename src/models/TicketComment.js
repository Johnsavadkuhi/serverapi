const mongoose = require('mongoose');

const TicketCommentSchema = new mongoose.Schema({
  
    ticketId : {
        type:Number , 
index:true         
    }, 
  
    /**
   * آیدی تیکتی که این کامنت به آن تعلق دارد
   * ارجاع به مدل Ticket
   */
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true,
    index: true
  },

  /**
   * کاربری که این کامنت را ایجاد کرده است
   */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  /**
   * متن اصلی کامنت
   */
  text: {
    type: String,
    required: true
  },

  /**
   * در صورتی که این کامنت پاسخ به کامنت دیگری باشد
   */
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TicketComment'
  },

  /**
   * سیستم لایک کامنت
   */
  likes: {
    count: { type: Number, default: 0 },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },

  /**
   * سیستم دیس‌لایک کامنت
   */
  dislikes: {
    count: { type: Number, default: 0 },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },

  /**
   * کاربران منشن‌شده در کامنت
   */
  mentions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  /**
   * آیا منشن‌ها پردازش شده‌اند؟ (برای جلوگیری از ارسال چندباره نوتیفیکیشن)
   */
  mentionsProcessed: {
    type: Boolean,
    default: false
  },

  /**
   * فایل‌های پیوست‌شده به کامنت
   */
  attachments: [
    {
      filename: String,
      url: String,
      type: {
        type: String,
        enum: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/pdf',
          'video/mp4',
          'text/plain'
        ],
        required: true
      },
      size: {
        type: Number,
        max: 1000 * 1024 * 1024, // 1000MB
      
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],

  /**
   * آیا کامنت ویرایش شده است؟
   */
  isEdited: {
    type: Boolean,
    default: false
  },

  /**
   * تاریخ آخرین ویرایش
   */
  editedAt: {
    type: Date
  },



  /**
   * امتیاز (در صورت نیاز)
   */
 rating: {
  type: Number,
  min: 1,
  max: 5,
  default: null,
  validate: {
    validator: function (v) {
      return v === null || Number.isInteger(v);
    },
    message: '{VALUE} is not an integer value'
  }
}, 


  /**
   * گزارش‌های کاربران
   */
  reports: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    reportedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'dismissed', 'actioned'],
      default: 'pending'
    }
  }],

  /**
   * حذف نرم کامنت
   */
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  /**
   * وضعیت کامنت (مثلاً پاسخ رسمی، نظر QA و ...)
   */
  status: {
    type: String,
    enum: ['normal', 'official-response', 'qa-review', 'warning'],
    default: 'normal'
  },

  /**
   * زمان‌های ایجاد و آپدیت
   */
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }, 
  /**
 * کاربرانی که این کامنت را مشاهده کرده‌اند
 */
readBy: [
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    readAt: { type: Date, default: Date.now }
  }
]


});



// 📌 ایندکس‌ها
TicketCommentSchema.index({ text: 'text' });
TicketCommentSchema.index({ createdAt: -1 });
TicketCommentSchema.index({ 'likes.count': -1 });
TicketCommentSchema.index({ 'dislikes.count': -1 });
TicketCommentSchema.index({ isDeleted: 1 });
TicketCommentSchema.index({ 'readBy.user': 1 });

module.exports = mongoose.model('TicketComment', TicketCommentSchema);

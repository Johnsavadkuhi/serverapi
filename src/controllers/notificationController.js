const Notification = require("../models/Notification");

const getUserNotifs = async (req, res) => {
  const userId = req.query.userId;
  console.log("userID:", userId);

  try {
    const notifications = await Notification.find({ 
      userId, 
      seen: false 
    })
    .sort({ createdAt: -1 })
    .limit(50);

    res.json({ notifications });
  } catch (error) {
    console.error("Error fetching seen notifications:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const setSeenNotification = async (req, res) => {
  const notifId = req.body.notifId;
  console.log("notifId:", notifId);

  const notif = await Notification.findOneAndUpdate(
    { _id: notifId },
    { seen: true, seenAt: new Date(), status: 'seen' },
    { new: true }
  );

  if (!notif) return res.status(404).json({ error: 'Not found' });

  res.json({ notif });
};



module.exports = {
    getUserNotifs  , setSeenNotification
  };
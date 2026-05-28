const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const requireAuth = ClerkExpressRequireAuth({
  onError: (err, req, res) => {
    res.status(401).json({ error: 'Unauthorized' });
  },
});

const getUserId = req => req.auth?.userId;

module.exports = { requireAuth, getUserId };

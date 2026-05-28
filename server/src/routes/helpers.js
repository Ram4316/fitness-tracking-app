const { getUserId } = require('../middleware/auth');

const requireUserId = req => {
  const userId = getUserId(req);
  if (!userId) {
    const error = new Error('Unauthorized');
    error.status = 401;
    throw error;
  }
  return userId;
};

module.exports = { requireUserId };

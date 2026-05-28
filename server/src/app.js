const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const { requireAuth } = require('./middleware/auth');
const apiRoutes = require('./routes');
const healthRoutes = require('./routes/health');

const app = express();

app.use(helmet());
app.use(cors({ origin: true }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.use('/health', healthRoutes);
app.use('/api', requireAuth, apiRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Server error' });
});

module.exports = app;

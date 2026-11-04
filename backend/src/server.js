// Local development server. In production the same app runs as a Vercel function (api/index.js).
require('dotenv').config();
const { app, connectDb } = require('./app');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    if (process.env.MONGODB_URI) {
      await connectDb();
      console.log('Connected to MongoDB');
    } else {
      console.warn('MONGODB_URI not set — running without database');
    }
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start:', err);
    process.exit(1);
  }
}

start();

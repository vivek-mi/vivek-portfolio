// Vercel serverless function: runs the Express contact API. vercel.json sends every /api/* request here.
const { app, connectDb } = require('../backend/src/app');

module.exports = async (req, res) => {
  try {
    await connectDb();
  } catch (err) {
    // The contact route answers 503 when it has nowhere to deliver the message
    console.error('MongoDB connection failed:', err.message);
  }
  return app(req, res);
};

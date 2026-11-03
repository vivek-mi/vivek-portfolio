const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Strict rate limit for contact form: 5 per hour per IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many contact form submissions. Please try again later.' }
});

const validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name too long'),
  body('email')
    .trim()
    .isEmail().withMessage('Valid email required')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be 10–2000 characters'),
];

router.post('/', contactLimiter, validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;

  const canStore = require('mongoose').connection.readyState === 1;
  const canEmail = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
  if (!canStore && !canEmail) {
    console.error('Contact form: neither MongoDB nor SMTP is configured; message not delivered');
    return res.status(503).json({ error: 'Contact form is not configured. Please email directly.' });
  }

  try {
    if (canStore) {
      const Contact = require('../models/Contact');
      await Contact.create({
        name,
        email,
        message,
        ip: req.ip,
      });
    }

    if (canEmail) {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.NOTIFY_EMAIL || 'vivek79054@gmail.com',
        replyTo: email,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
    }

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Contact route error:', err);
    res.status(500).json({ error: 'Failed to save message. Please email directly.' });
  }
});

module.exports = router;

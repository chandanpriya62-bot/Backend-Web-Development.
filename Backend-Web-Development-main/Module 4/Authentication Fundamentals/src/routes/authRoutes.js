
const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return res.status(400).json({
        error: {
          code: 'INVALID_INPUT',
          message: 'Name, email, and password are required'
        }
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // TODO: use your repository to check/create the user
    // const existingUser = await userRepository.findByEmail(normalizedEmail);

    // if (existingUser) {
    //   return res.status(409).json({
    //     error: {
    //       code: 'EMAIL_EXISTS',
    //       message: 'An account with this email already exists'
    //     }
    //   });
    // }

    const passwordHash = await bcrypt.hash(password, 10);

    // TODO: create user using your repository
    // const user = await userRepository.create({
    //   name: name.trim(),
    //   email: normalizedEmail,
    //   passwordHash
    // });

    // Temporary response until repository is connected
    return res.status(201).json({
      data: {
        name: name.trim(),
        email: normalizedEmail
      }
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password.trim()
    ) {
      return res.status(400).json({
        error: {
          code: 'INVALID_INPUT',
          message: 'Email and password are required'
        }
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // TODO: get user from your repository
    // const user = await userRepository.findByEmail(normalizedEmail);

    // if (!user) {
    //   return res.status(401).json({
    //     error: {
    //       code: 'INVALID_CREDENTIALS',
    //       message: 'Invalid email or password'
    //     }
    //   });
    // }

    // const valid = await bcrypt.compare(password, user.passwordHash);

    // if (!valid) {
    //   return res.status(401).json({
    //     error: {
    //       code: 'INVALID_CREDENTIALS',
    //       message: 'Invalid email or password'
    //     }
    //   });
    // }

    return res.status(401).json({
      error: {
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password'
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


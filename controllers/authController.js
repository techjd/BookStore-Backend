import User from '../models/User.js';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import FailureResponse, { fixedresponse } from '../utils/FailureResponse.js';
import {
  ADDRESS,
  FAILURE,
  INVALID_PASSWORD,
  LOGIN_SUCCESSFUL,
  REGISTRATION_SUCCESSFUL,
  SUCCESS,
  USER_ALEADY_EXISTS,
  USER_NOT_FOUND,
} from '../utils/Constants.js';
import e from 'express';
config();
const KEY = process.env.SECRET_KEY;

// @desc    Login for the Platform
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      const failureResponse = new FailureResponse(FAILURE, USER_NOT_FOUND, '');
      const response = failureResponse.response();
      return res.status(404).json(response);
    }

    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!matchedPassword) {
      const failureResponse = new FailureResponse(
        FAILURE,
        INVALID_PASSWORD,
        ''
      );
      const response = failureResponse.response();
      return res.status(401).json(response);
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      KEY
    );

    console.log(email + password);
    res.status(201).json({
      status: SUCCESS,
      message: LOGIN_SUCCESSFUL,
      data: {
        user: existingUser,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(fixedresponse);
  }
};

// @desc    Register as a Seller or a Buyer
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    console.log(KEY);
    const { firstName, lastName, email, role, password } = req.body;
    console.log(firstName, lastName, email, role, password);
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      const failureResponse = new FailureResponse(
        FAILURE,
        USER_ALEADY_EXISTS,
        ''
      );
      const response = failureResponse.response();
      return res.status(401).json(response);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, KEY);

    res.status(201).json({
      status: SUCCESS,
      message: REGISTRATION_SUCCESSFUL,
      data: {
        user: result,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(fixedresponse);
  }
};

export { login, register };

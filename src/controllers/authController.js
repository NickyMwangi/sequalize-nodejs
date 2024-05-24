import user from "../../db/models/user.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const Login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(password)
  if (email && password) {
    const result = await user.findOne({ where: { email } })
    if (result && await bcrypt.compare(password, result.password)) {
      result.token = generateToken({
        name: `${result.firstName} ${result.lastName}`,
        id: result.id,
        email: result.email,
        phoneNumber: result.phoneNumber,
        userType: result.userType,
      })
      return res.status(200).json({
        status: 'success',
        message: 'logged in successfully',
        token: result.token
      })
    }
    return res.status(401).json({
      status: 'Failed',
      message: 'Incorrect email address and password'
    })
  }
  return res.status(401).json({
    status: 'Failed',
    message: 'Please provide both email and password'
  })

}

export const register = async (req, res, next) => {
  const body = req.body;
  if (!['1', '2'].includes(body.userType)) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Invalid userType'
    })
  }
  const newUser = await user.create({
    userType: body.userType,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    age: body.age,
    phoneNumber: body.phoneNumber,
    password: body.password,
    confirmPassword: body.confirmPassword
  })
  if (newUser) {
    const result = newUser.toJSON();
    delete result.password;
    delete result.deletedAt;
    return res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      data: result
    })
  }
  return res.status(400).json({
    status: 'Failed',
    message: 'Failed to add the new user'
  })
}

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}
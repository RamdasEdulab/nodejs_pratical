var generateToken = require('../token/generateToken');
var User = require('../models/UserModel')


const registerUser = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
}

const authUser = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
  
    const user = await User.findOne({ email })
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  }

const getUserProfile = async (req, res) => {
  console.log(req.body);
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}


const updateUserProfile = async (req, res) => {
  console.log(req.body);
  const user = await User.findById(req.user._id)

  if (user) {
    name = req.body.name,
    email = req.body.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}


const getUsers = async (req, res) => {
  console.log(req.body)
  const users = await User.find({})
  res.json(users)
}


module.exports= {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
}

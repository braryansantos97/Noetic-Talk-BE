require('dotenv').config()
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const SECRET = process.env.SECRET;


// hashing function
const hash = (password) => {
  const levelOne = crypto.createHmac('sha256', process.env.SECRET)
                  .update(password)
                  .digest('hex')
                  .split('')
                  .reverse()
                  .join('j')
  return crypto.createHmac('sha256', process.env.SECRET)
                  .update(levelOne)
                  .digest('hex')
                  .split('')
                  .reverse()
                  .join('')
}

module.exports.hash = hash

const registerService = async (req, res) => {
  const hashedPassword = hash(req.body.password)
  console.log('hashedPassword:', hashedPassword )
  req.body.password = bcrypt.hashSync(hashedPassword, bcrypt.genSaltSync(10))
  console.log(req.body)

  try{
    const createdUser = await User.create(req.body)
    const token = jwt.sign({
      username: createdUser.username
    }, SECRET)
    res.status(200).json({ user: createdUser, token })
  }catch(err){
    console.error(err)
    res.status(400).json({ msg: err.message })
  }
}

module.exports.register = registerService

// verification

// login

const loginService = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email })
    req.body.password = hash(req.body.password)
    if(bcrypt.compareSync(req.body.password, foundUser.password)){
      const token = jwt.sign({
        email: foundUser.email
      }, SECRET)
      res.status(200).json({ user: foundUser, token })
    }else {
      throw new Error('Authentication failed! Try again')
    }
  }catch(err){
    console.error(err)
    res.status(400).json({ msg: err.message })
  }
}

module.exports.login = loginService
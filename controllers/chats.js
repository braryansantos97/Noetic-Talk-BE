require('dotenv').config()
const Chat = require('../models/chat');
const router = require('express').Router();

//comment

//Create
router.post('/', async (req, res) => {
  try {
    const createdChat = await Chat.create(req.body)
    res.status(200).json(createdChat)
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message })
  }
})

//Read
  /*Index*/
  router.get('/', async (req, res) => {
    try {
      const theChats = await Chat.find({})
      res.status(200).json(theChats)
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message})
    }
  })

  /*Show*/
  router.get('/:id', async (req, res) => {
    try {
      const oneChat = await Chat.findById(req.params.id)
      res.status(200).json(oneChat)
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message})
    }
  })

//Update
  /*Update the Chat*/
//   router.put('/:id', async (req, res) => {
//     try {
//       const updatedChat = await Chat.findByIdAndUpdate(req.params.id, req.body, { new: true})
//       res.status(200).json(updatedChat)
//     } catch (error) {
//       console.error(error);
//       res.status(400).json({ message: error.message})
//     }
//   })

//Delete

// router.delete('/:id', async(req,res) => {
//   try {
//     const deletedChat = await Chat.findByIdAndDelete(req.params.id);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message})
//   }
// })

module.exports = router;

var express = require('express');
var LinkRouter = express.Router();
const Link = require("../models/Links");
const authMiddleware = require('../middleware/auth');
const baseUrl = require('../url');
const shortid = require('shortid');

LinkRouter.post('/generate', authMiddleware,async (req, res) => {
  try {
    
    const baseURL = baseUrl.baseUrl;
    const { from } = req.body
    
    const code = shortid.generate()
    
    const exist = await Link.findOne({ from })
    
    if (exist) {
      return res.json({link:exist})
    }

    const to = baseURL + '/t/' + code 
    const link = new Link({
      code,to,from,owner:req.user.userId
    })

    await link.save()
    res.status(201).json({ link })
    // console.log(req.headers)

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


LinkRouter.get('/',authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    console.log(typeof links)
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


LinkRouter.get('/:id', authMiddleware,async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports=LinkRouter
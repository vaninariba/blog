const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get(('/posts'),async (req,res) =>{
    const newpost = await Post.find().sort({fecha: 'desc'})
   res.render('posts/posts',{newpost})
})
//
//router.get(('/blog'),async (req,res)=>{
  //  const post = await Post.find().sort({fecha: 'desc'})
    //res.render('./posts/blog',{post})
//})

router.get(('/posts/add'),(req,res)=>{
    res.render('./posts/newpost')
})
router.post(('/newpost'),async (req,res)=>{
    const {titulo,autor,descripcion,texto} = req.body
    const newpost = new Post({titulo,autor,descripcion,texto})
    await newpost.save()
        res.redirect('/posts')
})
router.get(('/posts/edit/:id'),async (req,res)=>{
    const post = await Post.findById(req.params.id)
    res.render('./posts/edit', {post})
})
router.put(('/posts/edit/:id'),async (req,res)=>{
    const{titulo,autor,descripcion,texto} = req.body
    await Post.findByIdAndUpdate(req.params.id,{titulo,autor,descripcion,texto})
    res.redirect('/posts')
})
router.delete(('/posts/delete/:id'),async(req,res)=>{
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/posts')
})
router.get('/blog/', async(req, res) => {
    const post = await Post.find().limit(6).sort({fecha: 'desc'})
    res.render('./posts/blog',{post})
  })
  router.get('/blog/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('./posts/readmore', { post: post })
  })

module.exports = router
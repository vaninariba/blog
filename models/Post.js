const mongoose = require ('mongoose')
const { Schema }  = mongoose
const slugify = require('slugify')

const PostSchema = new Schema ({
    titulo: { type:String, required:true},
    autor: {type:String, required:true},
    descripcion: { type:String, required:true},
    texto: { type:String, required:true},
    fecha: { type:Date, default:Date.now}
})

  
module.exports= mongoose.model('Post',PostSchema)
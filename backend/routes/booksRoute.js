import express from "express"
import { Book } from "../models/bookModel.js"
import mongoose from "mongoose";


const router = express.Router()

  router.post("/",async(req,res) => {
    try{
      if(
         !req.body.title||
         !req.body.author||
         !req.body.publishYear
        ) 
         {
          return res.status(400).send({message:'send all required field title , author , publishYear'})
         }
      const newBook = {
        title:req.body.title,
        author:req.body.author,
        publishYear:req.body.publishYear
      }
  
      const book = await Book.create(newBook)
  
      return res.status(201).send(book)
    }
    catch(error){
      console.log(error.message)
      res.status(500).send({message:error.message})
    }
  })
  
  ///get route
  
  router.get("/",async(req,res) => {
    try{
      const books = await Book.find({})
      return res.status(200).json({
        count : books.length,
        data : books
      })
    }
    catch(error){
      console.log(error)
      res.status(500).send({message:error.message})
    }
  })
  // get only one book by id
  
  // router.get("/:id",async(req,res) => {
  //   try{
  
  //     const id = req.params.id
  
  //     const book = await Book.findById(id)
  //     return res.status(200).json(book)
  //   }
  //   catch(error){
  //     console.log(error)
  //     res.status(500).send({message:error.message})
  //   }
  // })
  router.get('/:id', async (req, res) => {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid book ID' });
    }

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
  
  //update books
  
  router.put("/:id",async(req,res) => {
    try {
      if(
        !req.body.title||
        !req.body.author||
        !req.body.publishYear
       ) 
        {
         return res.status(400).send({message:'send all required field title , author , publishYear'})
        }
      const id = req.params.id
      const result = await Book.findByIdAndUpdate(id,req.body)
      if(!result){
        res.status(404).send({message:"Book does not exist"})
      }
      return res.status(200).send({message:"Books updated succesfully"})
      
    } catch (error) {
      console.log(error);
      res.status(500).send({message:error.message})
    }
  })
  
  //Routes for deleting
  
  router.delete("/:id",async(req,res) => {
    try {
      const id = req.params.id
  
      const result = await Book.findByIdAndDelete(id)
      if(!result){
        res.status(404).json({message:"Id does not exist"})
      }
      return res.status(200).send({message:"Deleted succesfully"})
  
    } catch (error) {
      console.log(error)
      res.status(500).send({message:error.message})
    }
  })

  export default router
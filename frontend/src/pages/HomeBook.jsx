import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { MdOutlineAddBox ,MdOutlineDelete } from "react-icons/md";
import { ScaleLoader} from"react-spinners"
import {Link} from 'react-router-dom' 
import BookTable from '../components/home/bookTable';


export default function HomeBook() {

    const [books , setBooks ] = useState([''])
    const [loading , setLoading ] = useState()
    useEffect(() => {
        axios.get('https://book-store-lac-sigma.vercel.app/books')
        .then((res) => {
            setBooks(res.data.data)
            setLoading(false) 
            console.log(res.data.data)           
        })
        .catch((error) =>{
            console.log(error)
            setLoading(false)
        })
    },[])
  return (
        <div className="flex justify-center h-screen">
  <div className="md:mt-6 md:p-6 border border-gray-300 rounded-2xl shadow-2xl dark:border-gray-700 dark:bg-gray-800">
    <div className="flex justify-between items-center md:w-[600px]">
      <h1 className="ml-6 text-2xl font-bold md:text-3xl md:bg-blue-500 md:font-semibold md:text-white px-4 py-2 rounded-xl my-8 dark:bg-blue-600 dark:text-gray-200">
        Book List
      </h1>
      <Link to="/books/create">
        <MdOutlineAddBox className="mr-10 text-sky-800 text-4xl dark:text-sky-400" />
      </Link>
    </div>
    <hr className="md:border border-gray-500 rounded-lg dark:border-gray-600" />
    {loading ? (
      <ScaleLoader className="text-center dark:text-gray-200" />
    ) : (
      <BookTable books={books} />
    )}
  </div>
</div>
  )
}

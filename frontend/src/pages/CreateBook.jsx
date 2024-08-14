import axios from 'axios'
import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { ScaleLoader} from"react-spinners"

export default function CreateBook() {
    const [title ,setTitle] = useState('')
    const [author ,setAuthor] = useState('')
    const [publishYear ,setPublishYear] = useState('')
    const [loading ,setLoading] = useState(false)

        
    const navigate = useNavigate()

    const HandleSaveBook = () => {
   
    const data = {
        title,
        author,
        publishYear
    }
    setLoading(true)
    axios
    .post('https://book-store-lac-sigma.vercel.app/books',data)
    .then(()=>{
        setLoading(false)
        navigate('/')
    })
    .catch((error) => {
        alert("Error occures check console")
        console.log(error)
        setLoading(false)
    })
}
  return (
            <div className='flex justify-center h-screen shadow-md'>
                <div className='p-4 '>
                    <BackButton />
                    <h1 className='font-semibold my-4'>Create Book</h1>
                    {
                        loading ? (<ScaleLoader className='text-center'/>) :
                        (
                            <div className='flex flex-col border border-gray-300 rounded-xl md:w-[600px] px-4 pb-5 mx-auto shadow-2xl'>
                                <div className='my-4'>
                                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                                    <input type="text"
                                        value={title}
                                        onChange={(e)=>setTitle(e.target.value)}
                                        className='border  rounded-md border-gray-500 px-4 py-2 w-full' />
                                </div>
                                <div className='my-4'>
                                    <label className='text-xl text-center mr-4 text-gray-500'>Author</label>
                                    <input type="text"
                                        value={author}
                                        onChange={(e)=>setAuthor(e.target.value)}
                                        className=' border  border-gray-500 rounded-md px-4 py-2 w-full' />
                                </div>
                                <div className='my-4'>
                                    <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                                    <input type="text"
                                        value={publishYear}
                                        onChange={(e)=>setPublishYear(e.target.value)}
                                        className='border border-gray-500  rounded-md px-4 py-2 w-full' />
                                </div>
                                <button className='hover:bg-blue-400 items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm' onClick={HandleSaveBook}>Save</button>
                            </div>
                        )
                    }
                </div>
             </div>
  )
}

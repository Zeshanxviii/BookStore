import axios from 'axios'
import React , { useState , useEffect } from 'react'
import { useNavigate ,useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { ScaleLoader} from"react-spinners"

export default function EditBook() {
    const [title ,setTitle] = useState('')
    const [author ,setAuthor] = useState('')
    const [publishYear ,setPublishYear] = useState('')
    const [loading ,setLoading] = useState(false)

    const {id} = useParams() 
    const navigate = useNavigate()

    useEffect(()=>{
        setLoading(true)
        axios
        .get(`/books/${id}`)
        .then((res) => {
            setAuthor(res.data.author)
            setTitle(res.data.title)
            setPublishYear(res.data.publishYear)
            setLoading(false)
        })
        .catch((error) => {
            setLoading(false)
            console.log(error)
            alert("Error on console")
        })
    },[])

    const HandleEditBook = () => {
   
    const data = {
        title,
        author,
        publishYear
    }
    setLoading(true)
    axios
    .put(`http://localhost:5555/books/${id}`,data)
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
       <div className='flex justify-center h-screen '>    
            <div className='p-4'>
                <BackButton />
                <h1 className='text-xl md:text-3xl font-semibold my-4'>Edit Book</h1>
                {
                    loading ? (<ScaleLoader className='text-center' />) :
                    (
                        <div className='flex flex-col shadow-xl border border-gray-300 rounded-xl md:w-[600px] px-4 pb-5 mx-auto'>
                            <div className='my-4'>
                                <label className='text-xl mr-4 text-gray-500'>Title</label>
                                <input type="text"
                                    value={title}
                                    onChange={(e)=>setTitle(e.target.value)}
                                    className='border border-gray-300 rounded-md px-4 py-2 w-full' />
                            </div>
                            <div className='my-4'>
                                <label className='text-xl mr-4 text-gray-500'>Author</label>
                                <input type="text"
                                    value={author}
                                    onChange={(e)=>setAuthor(e.target.value)}
                                    className='border border-gray-300 rounded-md px-4 py-2 w-full' />
                            </div>
                            <div className='my-4'>
                                <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                                <input type="text"
                                    value={publishYear}
                                    onChange={(e)=>setPublishYear(e.target.value)}
                                    className='border border-gray-500 rounded-md px-4 py-2 w-full' />
                            </div>
                            <button className='hover:bg-blue-400 items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm' onClick={HandleEditBook}>Save</button>
                        </div>
                    )
                }
            </div>
        </div>
  )
}

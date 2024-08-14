import React , {useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BackButton from '../components/BackButton'
import { ScaleLoader} from"react-spinners"

export default function ShowBook() {
    const {id} = useParams()
    const [book , setBook] = useState({})
    const [loading ,setLoading] = useState()

    useEffect(() =>{
        setLoading(true)
        axios
        .get(`https://book-store-backend1-n669b9srg-jishans-projects-80682501.vercel.app/books/${id}`)
        .then((res)=>{
            setBook(res.data)
            // console.log(res);            
            setLoading(false)
        })
        .catch((error) => console.log(error))

    },[])
  return (
    <div className='flex justify-center h-screen '>

    <div className='p-4'>
        <BackButton />
        <h1 className='text-xl md:text-3xl font-semibold my-4 '>Show Book</h1>
        {loading ? (<ScaleLoader className='text-center'/>) :
        (
            <div className='flex flex-col shadow-xl border border-grey-400 rounded-xl w-fit p-4'>
                <div className='my-4'>
                    <span className='font-semibold mr-4 '>Id :</span>
                    <span className='text-center' >{book._id}</span>
                </div>
                <div className='my-4'>
                    <span className='font-semibold mr-4 '>Title :</span>
                    <span className='text-center'>{book.title}</span>
                </div>
                <div className='my-4'>
                    <span className='font-semibold mr-4'>Author :</span>
                    <span className='text-center'>{book.author}</span>
                </div>
                <div className='my-4'>
                    <span className='font-semibold mr-4 '>Publich Year :</span>
                    <span className='text-center'>{book.publishYear}</span>
                </div>
                <div className='my-4'>
                    <span className='md:text-xl mr-4 text-green-500'>Create Time</span>
                    <span className='text-center'>{new Date(book.createdAt).toString()}</span>
                </div>
                <div className='my-4'>
                    <span className='md:text-xl mr-4 text-red-500'>Last Update Time</span>
                    <span className='text-center'>{new Date(book.updatedAt).toString()}</span>
                </div>
            </div>
        )}
    </div>
</div>
  )
}

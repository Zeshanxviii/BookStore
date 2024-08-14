import React , {useState} from 'react'
import axios from 'axios'
import { ScaleLoader} from"react-spinners"
import { useNavigate , useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'

export default function DeleteBook() {
    const [loading , setLoading ] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()

    const HandleDelete = () => {
        setLoading(true)
        axios
        .delete(`/books/${id}`)
        .then(() => {
            setLoading(false)
            navigate('/')
        })
        .catch((error)=>{
            setLoading(false)
            alert("Error check console")
            console.log(error)
        })
    }
  return (
    <div className='flex justify-center h-screen drop-shadow-xl'>
            <div className='p-4'>
                <BackButton /> 
                <h1 className='text-xl md:text-4xl font-semibold my-4'>Delete Book</h1>
                {
                    loading ? (<ScaleLoader className='text-center' />) : 
                    (
                        ' '
                    )
                }
                <div className='flex flex-col items-center border  border-gray-300 shadow-xl rounded-xl md:w-[600px] p-8 mx-auto'>
                    <h3 className='md:text-2xl'>Are you sure want to delete this book</h3>
                    <button className='py-4 px-8 bg-red-600 rounded-lg hover:bg-red-500 text-white m-8  w-fit'
                    onClick={HandleDelete}>
                        Yes, Delete it
                    </button>
                </div>
            </div>
    </div>
  )
}

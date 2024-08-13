import React, { useState, useEffect } from 'react'
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { MdOutlineDelete } from "react-icons/md";
import { ScaleLoader } from 'react-spinners';

export default function BookTable({ books }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (books && books.length > 0) {
            setLoading(false);
        }
    }, [books]);

    return (
        <div>
            {loading ? (
                <ScaleLoader />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='md:border border-slate-600 rounded-md'>No</th>
                            <th className='md:border border-slate-600 rounded-md'>Title</th>
                            <th className='md:border border-slate-600 rounded-md max-mid:hidden'>Author</th>
                            <th className='md:border border-slate-600 rounded-md max-mid:hidden'>Publish Year</th>
                            <th className='md:border border-slate-600 rounded-md'>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book._id} className='h-8'>
                                <td className='md:border border-slate-600 rounded-md text-center'>{index + 1}</td>
                                <td className='md:border border-slate-600 rounded-md max-mid:hidden text-center'>{book.title}</td>
                                <td className='md:border border-slate-600 rounded-md max-mid:hidden text-center'>{book.author}</td>
                                <td className='md:border border-slate-600 rounded-md max-mid:hidden text-center'>{book.publishYear}</td>
                                <td className='md:border border-slate-600 rounded-md'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/books/details/${book._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`/books/edit/${book._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                        <Link to={`/books/delete/${book._id}`}>
                                            <MdOutlineDelete className='text-2-xl text-red-600' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

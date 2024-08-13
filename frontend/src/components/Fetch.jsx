import React, { useEffect } from 'react'
import axios from 'axios'

function Fetch() {
    useEffect(
        () =>{
            axios.get('http://localhost:5555/books')
            .then((res) => console.log(res))
        }
    ,[])
  return (
    <>

    </>
  )
}

export default Fetch
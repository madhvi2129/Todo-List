import React, { useState } from 'react'
import axios from 'axios'
const Create = () => {
  const [task,setTask]=useState();
  const handleAdd =()=>{
  axios.post('http://localhost:8000/add',{task:task})
  .then(result => console.log(result))
  .catch(err => console.log(err))

  }
  return (
    <div>
        <input class="input" type="text"  onChange={(e) => setTask(e.target.value)} />
        <button class="button" type="button " onClick={handleAdd}>Add new</button>
    </div>
  )
}

export default Create
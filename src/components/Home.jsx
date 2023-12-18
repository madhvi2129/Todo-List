import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

const Home = () => {
  const [todo, setTodo] = useState([]);

  const handleEdit = (id) => {
    axios.put(`http://localhost:8000/update/${id}`)
      .then(result => {
        const updatedTodo = result.data;
        setTodo(prevTodo => prevTodo.map(item => (item._id === updatedTodo._id ? updatedTodo : item)));
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/delete/${id}`)
      .then(result => {
        const deletedId = result.data._id;
        setTodo(prevTodo => prevTodo.filter(item => item._id !== deletedId));
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get('http://localhost:8000/get')
      .then(result => setTodo(result.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home">
      <h2 className=''>To do List</h2>
      <Create />
      {todo.length === 0 ? (
        <div>No records to display</div>
      ) : (
        todo.length > 0 && todo.map((item) => (
          <div className="todo" key={item._id}>
            <div className='checkbox' onClick={() => handleEdit(item._id)}>
              {item.done ?
                <BsFillCheckCircleFill className="icon" />
                : <BsCircleFill className="icon" />
              }
              <p className={item.done ? "line-through" : ""}>{item.task}</p>
            </div>
            <div className="delete-icon" onClick={() => handleDelete(item._id)}>
              <BsFillTrashFill className="icon" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;

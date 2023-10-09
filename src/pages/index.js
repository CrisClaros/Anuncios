import Head from 'next/head'
import React, { useState } from 'react'
import Axios from 'axios'

export default function Home() {
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = () => {
    const todoObj = {
      title: title,
      todo: todo,
      description: description,
      startDate: startDate,
      endDate: endDate,
      type: type,
    };

    Axios.post('/api/newTodo', todoObj)
      .then(() => {
        alert('Anuncio agregado');
        setTitle('');
        setTodo('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setType('');
      })
      .catch((error) => {
        console.error('Error al agregar el anuncio:', error);
      });
  };

  return (
    <>
      <div className='container'>
        <h1>Create new Anuncio</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" onChange={(event) => setTitle(event.target.value)} value={title} />
          </div>
          <div className="mb-3">
            <label htmlFor="todo" className="form-label">CreatedBy</label>
            <input type="text" className="form-control" id="todo" onChange={(event) => setTodo(event.target.value)} value={todo} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="description" className="form-control" id="description" onChange={(event) => setDescription(event.target.value)} value={description} />
          </div>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">StartDate</label>
            <input type="date" className="form-control" id="startDate" onChange={(event) => setStartDate(event.target.value)} value={startDate} />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">EndDate</label>
            <input type="date" className="form-control" id="endDate" onChange={(event) => setEndDate(event.target.value)} value={endDate} />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">Type</label>
            <input type="text" className="form-control" id="type" onChange={(event) => setType(event.target.value)} value={type} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { prisma } from "@prisma/client";
import { format } from 'date-fns'; // Importa la función de formateo de fecha desde date-fns
// ...


export async function getStaticProps() {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    props: {
      todos: JSON.parse(JSON.stringify(todos)),
    },
  };
}

const DisplayTodos = ({ todos }) => {
  const [visibility, setVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const [todoId, setTodoId] = useState(null);
  const [screenFormVisible, setScreenFormVisible] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState('');
  const [screens, setScreens] = useState([]); 
  const [formattedStartDate, setFormattedStartDate] = useState('');
  const [formattedEndDate, setFormattedEndDate] = useState('');
  const [hdmiConnected, setHdmiConnected] = useState(false); // Estado para HDMI
  const [resolution, setResolution] = useState(''); // Agrega el estado 'resolution'

  const hideScreenForm = () => {
    setScreenFormVisible(false);
  };

  useEffect(() => {
    // 0Llamada a la API para obtener la lista de pantallas disponibles
    // y actualizar el estado de 'screens' con los datos recibidos.
    // Axios.get(`/api/`)
    //   .then((response) => {
    //     setScreens(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);

  const editForm = (title, todo, description, startDate, endDate, type, todoId) => {
    setVisibility(!visibility);
    setTitle(title);
    setTodo(todo);
    setDescription(description);
    setFormattedStartDate(format(new Date(startDate), 'dd/MM/yyyy'));
    setFormattedEndDate(format(new Date(endDate), 'dd/MM/yyyy'));
    setType(type);
    setTodoId(todoId);
    setScreenFormVisible(false);

  };

  const showScreenForm = () => {
    setVisibility(false);
    setScreenFormVisible(!screenFormVisible);
  };
  
  
  const updateTodo = async (todoId) => {
    const todoObj = {
      title: title,
      todo: todo,
      description: description,
      startDate: startDate,
      endDate: endDate,
      type: type,
    };
    console.log(todoObj);
    await Axios.put(`/api/updateTodo?id=${todoId}`, todoObj).then(() => {
      window.location.reload(false);
    });
  };

  const deleteTodo = (todoId) => {
    Axios.delete(`/api/deleteTodo?id=${todoId}`).then(() => {
      window.location.reload(false);
    });
  };
  
  const assignScreen = async (todoId, screenId) => {
    try {
      // Crea una nueva pantalla
      const newScreenResponse = await Axios.post(`/api/newScreen`, {
        // Datos de la nueva pantalla, si es necesario
      });
  
      await Axios.put(`/api/updateScreen?id=${screenId}`, {
        screenId: newScreenResponse.data.id, 
      });
  
      window.location.reload(false);
    } catch (error) {
      console.error(error);
      // Maneja errores si es necesario.
    }
  };
  
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">title</th>
              <th scope="col">createdBY</th>
              <th scope="col">description</th>
              <th scope="col">startDate</th>
              <th scope="col">endDate</th>
              <th scope="col">type</th>
              <th scope="col">Options</th>
              <th scope="col">Screen</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((element) => {
              return (
                <tr key={element.id}>
                  <td>{element.title}</td>
                  <td>{element.todo}</td>
                  <td>{element.description}</td>
                  <td>{format(new Date(element.startDate), 'dd/MM/yyyy')}</td> {/* Formatea startDate */}
                  <td>{format(new Date(element.endDate), 'dd/MM/yyyy')}</td>   {/* Formatea endDate */}
                  <td>{element.type}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteTodo(element.id)}>Delete</button>
                    <button className="btn btn-primary" onClick={() => editForm(element.title, element.todo, element.description, element.startDate, element.endDate, element.type, element.id)}>Edit</button>
                    <button className="btn btn-primary" onClick={showScreenForm}>
                    Screen
                  </button>                  </td>
                  <td>{/* Espacio para mostrar la pantalla asignada */}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
     
      {visibility && (
        <div className="container">
          <h1>Update User</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                aria-describedby="emailHelp"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="todo" className="form-label">createdBY</label>
              <input
                type="text"
                className="form-control"
                id="todo"
                value={todo}
                aria-describedby="emailHelp"
                onChange={(event) => setTodo(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                aria-describedby="emailHelp"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="mb-3">
  <label htmlFor="startDate" className="form-label">startDate</label>
  <input
    type="text"
    className="form-control"
    id="startDate"
    aria-describedby="emailHelp"
    value={formattedStartDate} // Utiliza la fecha formateada
    onChange={(event) => setStartDate(event.target.value)}
  />
</div>
<div className="mb-3">
  <label htmlFor="endDate" className="form-label">endDate</label>
  <input
    type="text"
    className="form-control"
    id="endDate"
    aria-describedby="emailHelp"
    value={formattedEndDate} // Utiliza la fecha formateada
    onChange={(event) => setEndDate(event.target.value)}
  />
</div>

            <div className="mb-3">
              <label htmlFor="type" className="form-label">type</label>
              <input
                type="text"
                className="form-control"
                id="type"
                aria-describedby="emailHelp"
                value={type}
                onChange={(event) => setType(event.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={() => updateTodo(todoId)}>Submit</button>
            <button className="btn btn-danger" onClick={() => setVisibility(!visibility)}>Cancel</button>
          </form>
        </div>
      )}
      
      {screenFormVisible && (
  <div className="container">
    <h2>Asignar Pantalla</h2>
    <form>
      <div className="mb-3">
        <label htmlFor="screen" className="form-label">
          Selecciona una pantalla:
        </label>
        <select
          className="form-control"
          id="screen"
          value={selectedScreen}
          onChange={(event) => setSelectedScreen(event.target.value)}
        >
          <option value="">Seleccionar pantalla</option>
          {screens.map((screen) => (
            <option key={screen.id} value={screen.id}>
              {screen.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="resolution" className="form-label">
          Resolución:
        </label>
        <select
          className="form-control"
          id="resolution"
          value={resolution}
          onChange={(event) => setResolution(event.target.value)}
        >
          <option value="1920x1080">1920x1080</option>
          <option value="1280x720">1280x720</option>
          <option value="3840x2160">3840x2160</option>
          {/* Agrega otras resoluciones por defecto que desees */}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="hdmiConnected" className="form-label">
          Conectada a través de HDMI:
        </label>
        <select
          className="form-control"
          id="hdmiConnected"
          value={hdmiConnected ? "true" : "false"} // Convierte el valor booleano a una cadena
          onChange={(event) => setHdmiConnected(event.target.value === "true")}
        >
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => assignScreen(todoId, selectedScreen, hdmiConnected, resolution)}
      >
        Asignar
      </button>
    </form>
  </div>
)}

    </>
  );
};

export default DisplayTodos;

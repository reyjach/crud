import { isEmpty,size } from 'lodash';
import React,{useState} from 'react';
import shortid from 'shortid';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editeMode, setEditeMode] = useState(false);
  const [id, setId] = useState("");

  const addTask = (e) => {
    e.preventDefault();

    if(isEmpty(task)){
      return;
    }

    const newTask = {
      id: shortid.generate(),
      name: task
    }
    setTasks([...tasks, newTask])
    setTask("");
  }

  const delateTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  }

  const editTask = (theTask) => {
    setTask(theTask.name)
    setEditeMode(true);
    setId(theTask.id);

  }

  const saveTask = (e) => {
    e.preventDefault();

    if(isEmpty(task)){
      return;
    }

    const editedTasks = tasks.map(item => item.id === id ? {id, name: task}: item );
    setTasks(editedTasks);
    setEditeMode(false);
    setTask("");
    setId("");
  }

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr></hr>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Listas de Tareas</h4>
          {
            size(tasks) === 0 ? (
              <h5 className="text-center">Aun no hay tareas programadas</h5>
            ):(
              <ul className="list-group">
              {
                tasks.map((task) =>(
                  <li className="list-group-item" key={task.id}>
                    <span className="lead">{task.name}</span>
                    <button 
                      className="btn btn-danger btn-sm float-right mx-2" 
                      onClick={() => delateTask(task.id)}>
                        Eliminar
                      </button>
                    <button 
                      className="btn btn-warning btn-sm float-right" 
                      onClick={() => editTask(task)}>
                        Editar
                    </button>
                  </li>
                ))
              }
              </ul>
            )
            
          }
        </div>
        <div className="col-4">
          <h4 
            className="text-center">
            {editeMode ? " Modificar tarea" : "Agregar tarea"}
          </h4>
          <form onSubmit={editeMode ? saveTask : addTask }>
            <input 
              type="text" 
              className="form-control mb-2" 
              placeholder="Ingresa la tarea..."
              onChange={(text) => setTask(text.target.value)}
              value={task}>
            </input>
            <button 
              className= {editeMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"} 
              type="submit">
              {editeMode ? "Guardar" : "Agregar"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

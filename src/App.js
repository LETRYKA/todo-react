import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

import React from "react";
import UseAnimations from "react-useanimations";
import alertCircle from 'react-useanimations/lib/alertCircle';
import moment from 'moment';

function App() {

  // States
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [filterState, setFilterState] = useState('ACTIVE');
  const [showPopup, setShowPopup] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState();
  const [isLightMode, setIsLightMode] = useState(false);
  const [log, setLog] = useState([]);



  // Get value from input
  const inputEventHandle = (event) => {
    setInputValue(event.target.value);
  };

  // Add input value to state
  const inputValueAdd = () => {
    if (inputValue.length === 0) {
      setError(true);
    } else {
      setError(false);
      const newTodo = { title: inputValue, id: uuidv4(), status: "ACTIVE", }
      setTodo([...todo, newTodo]);
      log.push({ task: todo.title, id: newTodo.id, logs: [{ status: "CREATED", timeline: moment() }] })
      setInputValue("");
    }
  };



  console.log(log)


  // Checkbox Function
  const checkBoxHandler = (id, isChecked) => {
    const newTodos = todo.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: isChecked ? "DONE" : "ACTIVE", checkedAt: moment() };
      } else {
        return todo;
      }
    });
    setTodo(newTodos);
  };

  const keypressAdd = (e, id) => {
    if (e.key === 'Enter') {
      inputValueAdd();
    }
  };


  // Delete Function
  const deleteHandler = () => {
    const updatedTodos = todo.map((task) => {
      if (task.id === taskToDelete) {
        return { ...task, status: "LOG", log: "DELETED" };
      }
      return task;
    });
    setTodo(updatedTodos);
    setShowPopup(false);
    setTaskToDelete();
  };

  // Filter by status
  const handleFilterState = (state) => {
    setFilterState(state);
  };

  // Delete popup Functions
  const openDeletePopup = (id) => {
    setTaskToDelete(id);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };


  // Empty Message Placeholder
  const messageHandler = () => {
    if (filterState === "ALL" && todo.length === 0) {
      return "Currently there is no task.";
    }

    if (filterState === "ACTIVE" && todo.filter((task) => task.status === "ACTIVE").length === 0) {
      return "Currently there is no active task.";
    }

    if (filterState === "DONE" && todo.filter((task) => task.status === "DONE").length === 0) {
      return "Currently there is no completed task.";
    }

    if (filterState === "LOG" && todo.filter((task) => task.status === "LOG").length === 0) {
      return "Currently there is no logs";
    }
  };

  const messageEmpty = messageHandler();

  // isMode
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const modeChange = () => {
    setIsLightMode(prevMode => !prevMode);
  };


  return (
    // App
    <div className="app-container center column">
      <div style={{ zIndex: '11' }} className='header'>
        <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', marginLeft: '120px' }} className='row'>
          <p className='logo'>todo list</p>
          <ul>
            <a href='https://github.com/LETRYKA/todo-react' target='_blank' rel='noreferrer'><li>Source Code</li></a>
          </ul>
        </div>
        <div style={{ marginRight: '120px' }} className='row'>
          <a style={{ marginRight: '5px' }} className='header-github center' target="_blank" rel="noreferrer" href="https://github.com/LETRYKA/todo-react"><svg viewBox="0 0 438.549 438.549" class="h-3 w-3"><path fill="var(--text)" d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path></svg><span class="sr-only">GitHub</span></a>
          <button className='header-github center' onClick={modeChange} ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--text)" stroke="var(--text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun hidden [html.dark_&amp;]:block"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg></button>
        </div>
      </div>

      {/* Delete Popup */}
      {showPopup && (
        <div style={{ zIndex: '10' }} className="popup-container center">
          <div className="popupDel center">
            <div style={{ width: '80%' }} className="column center">
              <UseAnimations animation={alertCircle} size={35} fillColor='var(--war)' strokeColor='var(--war)' />
              <div style={{ fontSize: '18px', fontWeight: '400' }}>
                Are you sure want to delete <div style={{ fontWeight: '700' }}>{todo.find((todo) => todo.id === taskToDelete).title}</div>
              </div>
              <div>
              </div>
              <div style={{ gap: '13px', marginTop: '30px' }} className="row">
                <div className="dlt-btn fade-In" onClick={closePopup}>Back</div>
                <div
                  style={{ background: 'var(--war)' }}
                  onClick={deleteHandler}
                  className="dlt-btn"
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task */}
      <h1 style={{ marginTop: '40px', marginBottom: '-5px' }}>Todo with React</h1>
      <p style={{ color: 'var(--gray-color)', fontSize: '14px', marginBottom: '50px' }} >Here's a list of your tasks for this month!</p>
      <div style={{ gap: '10px', width: '80%' }} className="row">
        <div style={{ display: 'flex', alignItems: 'start' }} className="column">
          <input onChange={inputEventHandle} onKeyDown={keypressAdd} type="text" id="add-new" value={inputValue} name="addtitle" placeholder="Add new Task" />
          {error && (
            <div style={{
              color: 'var(--text)',
              fontSize: '14px',
              marginLeft: '5px',
              marginTop: '5px',
            }}>
              <i style={{ marginRight: '5px' }} className="fa-solid fa-circle-minus"></i>
              Please enter a task name
            </div>
          )}
        </div>
        <button className="add-btn" onClick={inputValueAdd}>Add</button>
      </div>
      <div style={{ marginTop: '20px', gap: '10px', width: '80%' }} className="row">
        <button onClick={() => handleFilterState("ALL")} style={{ background: filterState === "ALL" ? "var(--secondary-color)" : "var(--white)", color: filterState === "ALL" ? "var(--white)" : "var(--black)", }}
          className="cat center">All</button>
        <button onClick={() => handleFilterState("ACTIVE")}
          style={{
            background: filterState === "ACTIVE" ? "var(--secondary-color)" : "var(--white)",
            color: filterState === "ACTIVE" ? "var(--white)" : "var(--black)",
          }}
          className="cat center">Active</button>
        <button onClick={() => handleFilterState("DONE")}
          style={{
            background: filterState === "DONE" ? "var(--secondary-color)" : "var(--white)",
            color: filterState === "DONE" ? "var(--white)" : "var(--black)",
          }}
          className="cat center">Completed</button>
        <button onClick={() => handleFilterState("LOGS")}
          style={{
            background: filterState === "LOGS" ? "var(--secondary-color)" : "var(--white)",
            color: filterState === "LOGS" ? "var(--white)" : "var(--black)",
          }}
          className="cat center">
          Logs
        </button>


      </div>

      {/* Empty Message Placehold */}
      <p style={{ fontSize: '14px', color: "var(--gray-color)", marginTop: messageEmpty ? "40px" : "0" }}>
        {messageEmpty}
      </p>

      <div className='tasks-container'>
        {/* Task Contaner */}
        {todo.filter((todo) => {
          if (filterState === "ALL") {
            return todo.status !== "LOG";
          } else if (filterState === "LOGS") {
            return todo.status === "LOG";
          } else {
            return todo.status === filterState;

          }
        }).map((todo, index) => (
          <div key={index} className="task-container animate-fadeIn">
            <div className="task center">
              <div className='task-row'>
                <div style={{ gap: '10px' }} className="row center">
                  {/* CHECKBOX */}
                  {todo.status !== "LOG" && (
                    <div style={{ marginLeft: '20px' }} className="checkbox-wrapper-43">
                      <input type="checkbox"
                        onChange={(e) => checkBoxHandler(todo.id, e.target.checked)}
                        id={`cbx-${index}`}
                        checked={todo.status === "DONE"} />
                      <label htmlFor={`cbx-${index}`} className="check">
                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                          <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                      </label>
                    </div>
                  )}
                  {/* CHECKBOX END */}
                  <p id="task-title"
                    style={{
                      fontWeight: todo.status === "LOG" ? "700" : "400",
                      marginTop: todo.status === "LOG" ? "20px" : "",
                      marginLeft: todo.status === "LOG" ? "25px" : "0",
                      textDecoration: todo.status === "DONE" ? 'line-through' : 'none',
                      color: todo.status === "DONE" ? '#999999' : 'var(--text)',
                    }}>
                    {todo.title}
                  </p>
                </div>
                <div className='center'>
                  {todo.status !== "LOG" && (
                    <i onClick={() => openDeletePopup(todo.id)} className="fa-solid fa-trash"></i>
                  )}
                  <div style={{ display: todo.status === "LOG" ? "flex" : "none" }}>
                    <i className="fa-solid fa-clock"></i>
                  </div>
                </div>
              </div>



              {/* <div style={{ marginBottom: todo.status === "LOG" ? "20px" : "0", display: todo.status === "LOG" ? "flex" : "none" }} className='log-child'>
                {todo.createdAt && (
                  <p className='time i-plus center'>
                    <i style={{ marginRight: '8px', fontSize: '13px', transition: 'all 0.2s ease-in-out' }} className="fa-solid fa-plus"></i>
                    Created {todo.createdAt ? `${moment(todo.createdAt).fromNow()}` : moment().fromNow()} </p>
                )}
                {todo.deletedAt && (
                  <p className='time i-trash center'>
                    <i style={{ marginRight: '8px', fontSize: '13px', transition: 'all 0.2s ease-in-out' }} className="fa-solid fa-trash"></i>
                    Deleted {todo.deletedAt ? `${moment(todo.deletedAt).fromNow()}` : moment().fromNow()}</p>
                )}
                {todo.checkedAt && (
                  <p className='time i-check center'>
                    <i style={{ marginRight: '8px', fontSize: '13px', transition: 'all 0.2s ease-in-out' }} className="fa-solid fa-check"></i>
                    Checked {todo.checkedAt ? `${moment(todo.checkedAt).fromNow()}` : moment().fromNow()} </p>
                )}
              </div> */}

            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          color: 'grey',
          marginTop: '30px',
          marginBottom: '40px',
          fontSize: '14px',
        }}> Powered by <a style={{ textDecoration: 'none', color: 'var(--secondary-color)', fontSize: '14px' }} href="https://pinecone.mn" target="_blank" rel="noreferrer">
          Pinecone academy</a>
      </p>

      {/* Footer */}
      <div className='footer'>
        <a style={{ textDecoration: 'none' }} href='https://github.com/LETRYKA/todo-react' rel='noreferrer' target='_blank'>
          <div style={{ cursor: 'pointer' }} className='row announcement'>
            <svg style={{ width: '18px', marginRight: '10px' }} viewBox="0 0 438.549 438.549" class="h-3 w-3"><path fill="var(--text)" d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path></svg>
            <p>created with ReactJs</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default App;

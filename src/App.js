import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {


  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState();
  const [filterState, setFilterState] = useState('ACTIVE')
  

  const inputEventHandle = (event) => {
    setInputValue(event.target.value);
  }


  const inputValueAdd = () => {
    if (inputValue.length === 0) {
      setError(true);
    } else {
      setError(false);
      setTodo([...todo, { title: inputValue, id: uuidv4(), status: "ACTIVE" }]);
      setInputValue("");
    }
  };


  const checkBoxHandler = (id, isChecked) => {
    const newTodos = todo.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: isChecked ? "DONE" : "ACTIVE" };
      } else {
        return todo;
      }
    });
    setTodo(newTodos);
  };


  const deleteHandler = (id) => {
    const updatedTodos = todo.filter((todo) => todo.id !== id);
    setTodo(updatedTodos);
  };

  const popupHandler = () => {

  };

  const handleFilterState = (state) => {
    setFilterState(state)
  };


  return (
    <div className="app-container center column">
      <div className='popup-container center'>
        <div className='popupDel center'>
          <div style={{ width: '80%' }} className='column center'>
            <div style={{ fontSize: '20px', fontWeight: '500' }} >Are you sure want<br></br>to delete</div>
            <div style={{ gap: '13px', marginTop: '30px' }} className='row'>
              <div className='dlt-btn'>Back</div>
              <div style={{ background: 'rgb(253, 71, 71)' }} onClick={() => deleteHandler(todo.id)} className='dlt-btn'>Delete</div>
            </div>
          </div>
        </div>
      </div>
      <h1 style={{ marginTop: '40px', marginBottom: '50px' }}>📝 Tasks</h1>
      <div style={{ gap: '10px', width: '80%' }} className="row">
        <div style={{ display: 'flex', alignItems: 'start' }} className='column'>
          <input onChange={inputEventHandle} type="text" id="add-new" value={inputValue} name="addtitle" placeholder="Add new Task" required="" />
          {error && <div style={{ color: 'rgb(255, 122, 122)', fontSize: '14px', marginLeft: '5px', marginTop: '5px' }}><i style={{ marginRight: '5px' }} className="fa-solid fa-circle-minus"></i>Please enter task name</div>}
        </div>
        <button className="add-btn" onClick={(inputValueAdd)}>Add</button>
      </div>
      <div style={{ marginTop: '20px', gap: '10px', width: '80%' }} className="row">
        <button onClick={() => handleFilterState("ALL")} style={{ background: filterState === "ALL" ? "#735BFF" : "white", color: filterState === "ALL" ? "white" : "black" }} className='cat center'>All</button>
        <button onClick={() => handleFilterState("ACTIVE")} style={{ background: filterState === "ACTIVE" ? "#735BFF" : "white", color: filterState === "ACTIVE" ? "white" : "black" }} className='cat center'>Active</button>
        <button onClick={() => handleFilterState("DONE")} style={{ background: filterState === "DONE" ? "#735BFF" : "white", color: filterState === "DONE" ? "white" : "black" }} className='cat center'>Completed</button>
      </div>

      {todo.filter((todo) => {
        if (filterState === "ALL") {
          return true
        } else {
          return todo.status === filterState
        }
      }).map((todo, index) => {
        return (
          <div key={index} className='task-container animate-fadeIn'>
            <div className='task center'>
              <div style={{ gap: '10px' }} className='row center'>
                <div style={{ marginLeft: '20px' }} className="checkbox-wrapper-43">
                  <input
                    type="checkbox"
                    onChange={(e) => checkBoxHandler(todo.id, e.target.checked)}
                    id={`cbx-${index}`}
                    checked={todo.status === "DONE"}
                  />

                  <label htmlFor={`cbx-${index}`} className="check">
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                      <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                      <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                  </label>
                </div>
                <p id="task-title" style={{ textDecoration: todo.status === "DONE" ? 'line-through' : 'none', color: todo.status === "DONE" ? '#999999' : 'white', }}>
                  {todo.title}
                </p>
              </div>
              <i onClick={() => deleteHandler(todo.id)} className="fa-solid fa-trash"></i>
            </div>
          </div>
        );
      })}
      <p style={{ color: 'grey', marginTop: '30px', marginBottom: '40px', fontSize: '14px' }}>Powered by <a style={{ textDecoration: 'none' }} href='https://pinecone.mn' target='_blank' rel="noreferrer">Pinecone academy</a></p>
    </div>
  );
}

export default App;

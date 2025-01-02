import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {


  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState()

  const inputEventHandle = (event) => {
    setInputValue(event.target.value);
  }

  const inputValueAdd = () => {

    if (inputValue.length === 0) {
      setError(true);
    } else {
      setError(false);
      setTodo([...todo, inputValue]);
      setInputValue("");
    }

  }


  return (
    <div className="app-container center column">
      <h1 style={{ marginTop: '40px', marginBottom: '50px' }}>📝 Tasks</h1>
      <div style={{ gap: '10px', width: '80%' }} className="row">
        <div style={{ display: 'flex', alignItems: 'start' }} className='column'>
          <input onChange={inputEventHandle} type="text" id="add-new" value={inputValue} name="addtitle" placeholder="Add new Task" required="" />
          {error && <div style={{ color: 'rgb(255, 122, 122)', fontSize: '14px', marginLeft: '5px', marginTop: '5px' }}><i style={{marginRight:'5px'}} className="fa-solid fa-circle-minus"></i>Please enter task name</div>}
        </div>
        <button className="add-btn" onClick={(inputValueAdd)}>Add</button>
      </div>
      <div style={{ marginTop: '20px', gap: '10px', width: '80%' }} className="row">
        <button className='cat center'>All</button>
        <button className='cat center'>Active</button>
        <button className='cat center'>Completed</button>
      </div>

      {todo.map((todo, index) => {
        return (
          <div key={index} className='task-container'>
            <div className='task center'>
              <div style={{ gap: '10px' }} className='row center'>
                <div style={{ marginLeft: '20px' }} className="checkbox-wrapper-43">
                  <input type="checkbox" id={`cbx-${index}`} />
                  <label htmlFor={`cbx-${index}`} className="check">
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                      <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                      <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                  </label>
                </div>
                <p id='task-title'>{todo}</p>
              </div>
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>
        );
      })}


      <p style={{ color: 'grey', marginTop: '30px', marginBottom: '40px' }}>Powered by Pinecone academy</p>
    </div>
  );
}

export default App;

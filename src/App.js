import './App.css';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';


// Components import
import Header from './components/Header.js';
import DeletePop from './components/Deletepopup.js';
import TaskCard from './components/TaskCard.js';
import ContainerHead from './components/ContainerHead.js';
import Footer from './components/Footer.js';

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
  const [isLogTabActive, setIsLogTabActive] = useState(false);

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
      const newTodo = { title: inputValue, id: uuidv4(), status: "ACTIVE" };
      setTodo([...todo, newTodo]);
      setLog(prevLogs => ({ ...prevLogs, [newTodo.id]: [...(prevLogs[newTodo.id] || []), { status: "CREATED", timeline: moment() }] }));
      setInputValue("");
    }
  };

  // Filter by status
  const handleFilterState = (state) => {
    setFilterState(state);
    if (state === "LOGS") {
      setIsLogTabActive(true);
    } else {
      setIsLogTabActive(false);
    }
  };

  // isMode
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const openDeletePopup = (id) => {
    setTaskToDelete(id);
    setShowPopup(true);
  };

  return (
    // App
    <div className="app-container center column">
      <Header setIsLightMode={setIsLightMode} />

      {/* Delete Popup */}
      {showPopup && (
        <DeletePop todo={todo} setTodo={setTodo} setLog={setLog} taskToDelete={taskToDelete} setTaskToDelete={setTaskToDelete} setShowPopup={setShowPopup} />
      )}

      {/* Task */}
      <ContainerHead filterState={filterState} handleFilterState={handleFilterState} todo={todo} inputEventHandle={inputEventHandle} inputValueAdd={inputValueAdd} inputValue={inputValue} error={error} log={log} />
      <TaskCard todo={todo} setTodo={setTodo} filterState={filterState} isLogTabActive={isLogTabActive} setLog={setLog} openDeletePopup={openDeletePopup} log={log} />
      <Footer todo={todo} setTodo={setTodo} />
    </div>
  );
}

export default App;
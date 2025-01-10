import moment from 'moment';

const TaskCard = (props) => {
  const { todo, setTodo, filterState, isLogTabActive, setLog, openDeletePopup, log } = props;

  // CHECKBOX HANDLER ISCHECKED
  const checkBoxHandler = (id, isChecked) => {
    const newTodos = todo.map((todo) => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, status: isChecked ? "DONE" : "ACTIVE" };

        setLog(prevLogs => ({
          ...prevLogs, [id]: [...(prevLogs[id] || []), { status: isChecked ? "CHECKED" : "UNCHECKED", timeline: moment() }]
        }));
        return updatedTodo;
      } else {
        return todo;
      }
    });
    setTodo(newTodos);
  };

  const filterTodo = (todo) => {
    if (filterState === "LOGS") {
      return todo.status === "LOG" || todo.status === "ACTIVE" || todo.status === "DELETED" || todo.status === "DONE";
    }
    if (filterState === "ALL") {
      return todo.status !== "LOG";
    } else {
      return todo.status === filterState;
    }
  }


  return (
    <div className='tasks-container'>
      {/* Task Container */}
      {todo.filter(filterTodo).map((todo, index) => (
        <div key={index} className="task-container animate-fadeIn">
          <div className="task center">
            <div className='task-row'>
              <div style={{ gap: '10px' }} className="row center">
                {/* CHECKBOX */}
                {!isLogTabActive && (
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
                    fontWeight: isLogTabActive ? "700" : "400",
                    marginTop: isLogTabActive ? "25px" : "",
                    marginLeft: isLogTabActive ? "20px" : "0",
                    textDecoration: todo.status === "DONE" ? 'line-through' : 'none',
                    color: todo.status === "DONE" ? '#999999' : 'var(--text)',
                  }}>
                  {todo.title}
                </p>
              </div>
              <div className='center'>
                {!isLogTabActive && (
                  <i onClick={() => openDeletePopup(todo.id)} className="fa-solid fa-trash"></i>
                )}
                {isLogTabActive && (
                  <i style={{ marginTop: '10px' }} className="fa-solid fa-clock"></i>
                )}
              </div>
            </div>
            {isLogTabActive && (
              <div style={{ width: '90%', display: 'flex', alignItems: 'start', marginBottom: '20px' }} className='column'>
                {/* Logs */}
                {log[todo.id] && log[todo.id].map((entry, index) => (
                  <p key={index} className="time i-check center">
                    {entry.status}  {moment(entry.timeline).fromNow()}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;

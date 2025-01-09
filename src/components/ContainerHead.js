
const ContainerHead = (props) => {
    const { filterState, handleFilterState, todo, inputEventHandle, inputValueAdd, inputValue, error } = props;

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

    const keypressAdd = (e, id) => {
        if (e.key === 'Enter') {
            inputValueAdd();
        }
    };


    return (
        <div style={{ width: '100%' }} className="center column">
            <h1 style={{ marginTop: '40px', marginBottom: '-5px' }}>Todo with React</h1>
            <p style={{ color: 'var(--gray-color)', fontSize: '14px', marginBottom: '50px' }} >Here's a list of your tasks for this month!</p>
            <div style={{ gap: '10px', width: '80%' }} className="row">
                <div style={{ display: 'flex', alignItems: 'start' }} className="column">
                    <input onChange={inputEventHandle} onKeyDown={keypressAdd} type="text" id="add-new" value={inputValue} name="addTitle" placeholder="Add new Task" />
                    {error && (
                        <div style={{
                            color: 'var(--war)',
                            fontSize: '14px',
                            marginLeft: '5px',
                            marginTop: '5px',
                        }}>
                            <i style={{ marginRight: '5px', color:'var(--war)' }} className="fa-solid fa-circle-minus"></i>
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

            {/* Empty Message Placeholder */}
            <p style={{ fontSize: '14px', color: "var(--gray-color)", marginTop: messageEmpty ? "40px" : "0" }}>
                {messageEmpty}
            </p>
        </div>

    );
};

export default ContainerHead;

const Category = (props) => {

    const { filterState, handleFilterState } = props;

    return {
        <div>
        <button onClick={() => handleFilterState("ALL")} style={{ background: filterState === "ALL" ? "var(--secondary-color)" : "var(--white)", color: filterState === "ALL" ? "var(--white)" : "var(--black)", }} className="cat center">
            All
        </button>
        <button lick={() => handleFilterState("ACTIVE")} style={{ background: filterState === "ACTIVE" ? "var(--secondary-color)" : "var(--white)", color: filterState === "ACTIVE" ? "var(--white)" : "var(--black)", }} className="cat center">
            Active
        </button>
        <button k={() => handleFilterState("DONE")} style={{ background: filterState === "DONE" ? "var(--secondary-color)" : "var(--white)", color: filterState === "DONE" ? "var(--white)" : "var(--black)", }} className="cat center">
            Completed
        </button>
        <button nClick={() => handleFilterState("LOGS")} style={{ background: filterState === "LOGS" ? "var(--secondary-color)" : "var(--white)", color: filterState === "LOGS" ? "var(--white)" : "var(--black)", }} className="cat center">
            Logs
        </button>
    </div>
    };
};

export default Category;


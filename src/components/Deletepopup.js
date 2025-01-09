import UseAnimations from "react-useanimations";
import alertCircle from 'react-useanimations/lib/alertCircle';

const DeletePop = (props) => {
    const { todo, taskToDelete, deleteHandler, setShowPopup } = props;

    const closePopup = () => {
        setShowPopup(false);
    };

    return (

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


    );
};

export default DeletePop;
import {React, useState, useDispatch, InfoIcon} from "../assets/MaterialUiExports";
import { addTask } from '../features/taskSlice';
import Login from './Auth/Login/Login';

const AddTask = () => {
    const [task, setTask] = useState("");
    const [taskError, setTaskError] = useState(false);
    const [openLogin, setOpen] = useState(false);

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");
    const add_Task = (e) => {
        e.preventDefault();
        if (token) {
            if (task === "") {
                setTaskError(true)
            } else {
                dispatch(addTask(task))
                setTask("")
            }
        } else {
          setOpen(true);
        }
    }

    return (
        <>
            <form className='addTaskDiv' onSubmit={add_Task}>
                <input className={`${(taskError) && "errorInput"} addTaskInput`} name='title' placeholder='Enter task here ...' value={task} onChange={(e) => { if (e.target.value.length <= 100) { setTask(e.target.value); setTaskError(false) } }} />
                <button className='addTaskBtn' type='submit'>Add Task</button>

            </form>
            <div className='addTaskDiv2'>
                <p>{(taskError) && <><InfoIcon id="addTaskIco"/> &nbsp; Kindly enter Task</>}</p>
                <span className={`${(task.length == 100) && "errorLimit"} titleCounting`}>{task.length}/100</span>
            </div>
            <Login openLogin={openLogin} setOpen={setOpen}/>
        </>
    )
}

export default AddTask
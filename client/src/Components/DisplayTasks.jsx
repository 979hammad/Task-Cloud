import {React, useState, useEffect, BorderColorIcon, DeleteIcon, useDispatch, useSelector} from "../assets/MaterialUiExports.js"
import { getAllTasks, allTasks, updateTask } from '../features/taskSlice';
import ConfirmAction from "./ConfirmAction/ConfirmAction.jsx";

const DisplayTasks = () => {
  const dispatch = useDispatch();
  const gotAllTasks = useSelector((state) => allTasks(state.task))
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [openCD, setOpenCD] = useState(false);
  const [taskId, setTaskId] = useState("");

  const token = localStorage.getItem("token");
  useEffect(() => {
    if(token){
      dispatch(getAllTasks())
    }
  }, [])

  const updatedTask = (task) => {
    if(task.title != newTitle){
      const data = { id: task.id, title: newTitle }
      dispatch(updateTask(data))
    }
    setEditingTaskId(null)
  }

  const editTask = (task) => {
    setEditingTaskId(task.id);
    setNewTitle(task.title)
  }

  return (
    <>
    {
      (token) && <div className='tableWrapper'>
      <table className='table'>
        <thead>
          <tr>
            <th style={{width : "10%"}}>ID</th>
            <th style={{width : "70%"}}>Task Title</th>
            <th style={{width : "20%"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
        {gotAllTasks.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>No Task Added</td>
            </tr>
          ) : (
            gotAllTasks.map((task) => (
              <tr key={task.id} >
                <td className='tableData'>
                  {task.id}
                </td>
                <td className='truncatedTitle'>
                  {
                    editingTaskId === task.id ? <input type="text" name="title" className='newTitleInput' value={newTitle} onChange={(e) => {if(e.target.value.length <= 100 ) {setNewTitle(e.target.value)}}} /> : <span className="titleDisplayed">{task.title}</span>
                  }
                </td>
                <td>
                  {
                    editingTaskId === task.id ? <button className='saveBtn' onClick={() => updatedTask(task)}>Update</button> : <><button className='editBtn' onClick={() => editTask(task)}><BorderColorIcon id="actionIco"/></button><button className='deleteBtn' onClick={() =>{ setTaskId(task.id); setOpenCD(true);}} ><DeleteIcon id="actionIco"/></button></>
                  }
                </td>
              </tr>
            )))}
        </tbody>
      </table>
    </div>
  }
  <ConfirmAction openCD={openCD} setOpenCD={setOpenCD} action="Delete Task" id={taskId}/>
  </>
  )
}

export default DisplayTasks
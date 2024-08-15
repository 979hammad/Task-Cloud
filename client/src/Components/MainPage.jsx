import React, { useEffect, useState } from 'react'
import { myProfile, user } from '../features/userAuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import DisplayTasks from './DisplayTasks'
import Login from './Auth/Login/Login'
import AddTask from './AddTask'
import NavBar from './NavBar'

const MainPage = () => {
  const dispatch = useDispatch();
  const [openLogin, setOpen] = useState(false);
  const loggedInUser = useSelector((state) => user(state.user));
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(myProfile())
  }, []);

  return (
    <>
      <div className='mainDiv'>
        <NavBar />
        <div className='mainDivInner'>
          {
            (token) ? <h3 className='mainPageMsg'>Welcome! {loggedInUser.name}</h3> : <h3 className='mainPageMsg'>Kindly <span className='loginMainPage' onClick={() => setOpen(true)}>Login</span> to ADD Task</h3>
          }
          <AddTask />
          <DisplayTasks />
        </div>
        <Login openLogin={openLogin} setOpen={setOpen} />

      </div>
    </>
  )
}

export default MainPage
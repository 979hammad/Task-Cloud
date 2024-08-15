import { React, Button, useEffect, useSelector, useDispatch, PriorityHighIcon } from "../../assets/MaterialUiExports";
import { DisplayConfirmAction } from "../../assets/DialogueAssets";
import { deleteTask, taskStatus } from "../../features/taskSlice";
import { deleteMyAccount, loading } from "../../features/userAuthSlice";
import { useNavigate } from 'react-router-dom';
import "./ConfirmAction.css";

const ConfirmAction = ({ action, openCD, setOpenCD, id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const taskStatus2 = useSelector((state)=> taskStatus(state.task)); 
    const deletingAccount = useSelector((state) => loading(state.user));

    const ConfirmTask = (action) => {
          if(action === "Delete My Account"){
            dispatch(deleteMyAccount())
          }
          if(action === "Delete Task"){
            dispatch(deleteTask(id))
          }
    };

    useEffect(()=>{
      if(taskStatus2 === "succeeded" || deletingAccount === "succeeded"){
        setOpenCD(false);
      }
    },[taskStatus2, deletingAccount])

    return (
        <>
            <DisplayConfirmAction open={openCD} onClose={() => setOpenCD(false)}>
                <div className="confirmAction">
                    <PriorityHighIcon id="alertCD" />
                    <Button
                        id="btnCD"
                        variant="contained"
                        onClick={() => ConfirmTask(action)}
                    >
                     {(taskStatus2 || deletingAccount) === "pending" ? "Deleting ..." : action}
                    </Button>
                </div>
            </DisplayConfirmAction>
        </>
    );
};

export default ConfirmAction;


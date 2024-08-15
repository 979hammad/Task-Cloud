import { React, useDispatch, useSelector, useEffect, Button, IconButton, Input, InputLabel, FormHelperText, useForm, CloseIcon} from "../../../assets/MaterialUiExports.js";
import { DisplaySignUp } from "../../../assets/DialogueAssets.js";
import { signUpUser, loading} from "../../../features/userAuthSlice.js";
import "./Signup.css";

const Signup = ({openSignUp, setOpenSignUp }) => {
  const dispatch = useDispatch();
  const accountCreating = useSelector((state)=> loading(state.user));
  const {register, handleSubmit, formState: { errors }, reset} = useForm();
  
  const submitForm = (data) => {
    dispatch(signUpUser(data));
  };

  useEffect(()=>{
    if(accountCreating === "succeeded"){
      setOpenSignUp(false)
      reset()
    }
  },[accountCreating])

  return (
    <>
      <DisplaySignUp onClose={() => setOpenSignUp(false)} open={openSignUp} >
        <IconButton
          onClick={() => setOpenSignUp(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon id="closeIcoSignUp"/>
        </IconButton>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="signUpForm">
            <p className="signUpHeading">Create Account</p>
            <InputLabel htmlFor="signUpname" id="signUpName">Name</InputLabel>
            <Input
              id="signUpname"
              autoComplete="off"
              {...register("name", {
                required: "Required field",
                maxLength: {
                  value: 20,
                  message: "Can't exceed 20 digits",
                }
              })}
              error={!!errors?.name}
            />
            <FormHelperText id="signUpFormInputs">
              {errors?.name?.message}
            </FormHelperText>

            <InputLabel htmlFor="signUpemail" id="signUpEmail">Email</InputLabel>
            <Input
              id="signUpemail"
              autoComplete="off"
              {...register("email", {
                required: "Required field",
                pattern: {
                  value: /^[A-Z0-9.%+-]+@[A-Z0-9.]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors?.email}
            />
            <FormHelperText id="signUpFormInputs">
              {errors?.email?.message}
            </FormHelperText>

            <InputLabel htmlFor="password" id="signUpPassword">Password</InputLabel>
            <Input
              id="signUpPassword"
              type="password"
              autoComplete="off"
              {...register("password", {
                required: "Required field",
                maxLength: {
                  value: 8,
                  message: "Can't exceed 8 digits",
                }
              })}
              error={!!errors?.password}
            />
            <FormHelperText id="signUpFormInputs">
              {errors?.password?.message}
            </FormHelperText>

            <InputLabel htmlFor="confirmPassword" id="signUpCPassword">Confirm Password</InputLabel>
            <Input
              id="signUpCPassword"
              type="password"
              autoComplete="off"
              {...register("cPassword", {
                required: "Required field",
                maxLength: {
                  value: 8,
                  message: "Can't exceed 8 digits",
                }
              })}
              error={!!errors?.cPassword}
            />
            <FormHelperText id="signUpFormInputs">
              {errors?.cPassword?.message}
            </FormHelperText>
            <Button id="signUpBtn" type="submit" variant="contained" >
               {accountCreating === "pending" ? "Creating..." : "Create Account"}
            </Button>
          </div>
        </form>
      </DisplaySignUp>
    </>
  );
};

export default Signup;

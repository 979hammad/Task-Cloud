import { useState, useSelector, useEffect, useDispatch, Button, IconButton, Input, InputLabel, FormHelperText, InputAdornment, Visibility, VisibilityOff, useForm, CloseIcon } from "../../../assets/MaterialUiExports.js";
import { loginUser, loading } from "../../../features/userAuthSlice.js";
import { DisplayLogin } from "../../../assets/DialogueAssets.js";
import Signup from "../Signup/Signup.jsx";
import "./Login.css";

const Login = ({ openLogin, setOpen }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [openSignUp, setOpenSignUp] = useState(false);

   const userLoggedIn = useSelector((state) => loading(state.user));

  const submitForm = (data) => {
    dispatch(loginUser(data))
  };

    useEffect(()=>{
      if(userLoggedIn === "succeeded")
       setOpen(false) 
       reset()
    },[userLoggedIn])

  return (
    <>
      <DisplayLogin
        id="displayLogin"
        onClose={() => setOpen(false)}
        open={openLogin}
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon  id="loginCloseIco"/>
        </IconButton>
        <form className="signInForm" onSubmit={handleSubmit(submitForm)}>
          
            <p className="signInHeading">Log in</p>
            <p className="signInHeading signInMsg">
              Welcome Back. Sign in to stay updated
            </p>
            <InputLabel htmlFor="email" id="email">Your Email</InputLabel>
            <Input
              id="email"
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
            <FormHelperText id="signInFormInputs">{errors?.email?.message}</FormHelperText>
            <InputLabel htmlFor="password" id="password">Your Password</InputLabel>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Required field" })}
              error={!!errors?.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff id="passIco"/> : <Visibility id="passIco"/>}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="signInFormInputs">{errors?.password?.message}</FormHelperText>
            <Button id="loginBtn" type="submit" variant="contained">
              {userLoggedIn === "pending" ? "Logging..." : "Log in"}
            </Button>
            <p className="signUp">
              Dont have an account ? <a className="signUpClick"
                onClick={()=>{setOpen(false); setOpenSignUp(true)}}
              > SignUp</a>
            </p>
       
        </form>
      </DisplayLogin>
      <Signup openSignUp={openSignUp} setOpenSignUp={setOpenSignUp}/>
    </>
  );
};

export default Login;
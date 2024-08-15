import { React, useState,useDispatch, Menu, MenuIcon, MenuItem, Box, Tooltip, IconButton, AccountCircleIcon } from "../assets/MaterialUiExports.js";
import { logoutUser } from "../features/userAuthSlice.js";
import ConfirmAction from "./ConfirmAction/ConfirmAction.jsx";
import Login from "./Auth/Login/Login.jsx";
import Signup from "./Auth/Signup/Signup.jsx";

const NavBar = () => {
    const dispatch = useDispatch();
    const [openLogin, setOpen] = useState(false);
    const [openCD, setOpenCD] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleMenuClose = () => {
        setAnchorElUser(null);
    };

    const token = localStorage.getItem("token");

    return (
        <>
            <nav className='navBar'>
                <div className="navLogoDiv">
                    <img id="navLogo" src="/logo PNG.png" alt="" />
                    <img id="navLogoText" src="/text PNG.png" />
                </div>
                <Box id="navBox" sx={{ flexGrow: 0 }} >
                    <Tooltip >
                        <IconButton id="navOptions"
                            onClick={(event) => setAnchorElUser(event.currentTarget)}
                            sx={{ p: 0 }}
                        >
                            <MenuIcon id="menuIco" />
                            <AccountCircleIcon id="menuIco" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px", ml: "10px" }}
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleMenuClose}
                    >
                        {
                            (!token) ? (
                                <div>
                                    <MenuItem id="menuItem"
                                        onClick={() => {
                                            handleMenuClose();
                                            setOpen(true);
                                        }}
                                    >
                                        LogIn
                                    </MenuItem>
                                    <MenuItem id="menuItem"
                                        onClick={() => {
                                            handleMenuClose();
                                            setOpenSignUp(true);
                                        }}
                                    >
                                        SignUp
                                    </MenuItem>
                                </div>
                            ) : (
                                <div>
                                    <MenuItem id="menuItem"
                                        onClick={() => {
                                            handleMenuClose();
                                            setOpenCD(true);
                                        }}
                                    >
                                        Delete Account
                                    </MenuItem>
                                    <MenuItem id="menuItem"
                                        onClick={() => {
                                            handleMenuClose();
                                            dispatch(logoutUser())
                                        }}
                                    >
                                        LogOut
                                    </MenuItem>
                                </div>
                            )
                        }


                    </Menu>
                </Box>
            </nav>
            <Login openLogin={openLogin} setOpen={setOpen} />
            <Signup openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} />
            <ConfirmAction openCD={openCD} setOpenCD={setOpenCD} action="Delete My Account"/>
        </>
    )
}

export default NavBar
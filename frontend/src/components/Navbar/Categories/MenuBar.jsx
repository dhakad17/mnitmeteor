import React from "react";
import MenuItem from "@mui/material/MenuItem";
import CategoryIcon from "@mui/icons-material/Category";
import ForumIcon from '@mui/icons-material/Forum';
import SellIcon from "@mui/icons-material/Sell";
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import MenuBarCategory from "./MenuBarCategories";
import { StyledMenu } from "../NavabarStyle";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LogoutUser, modelPopUp, SellNowclick } from "../../../AStatemanagement/Actions/userActions";


export default function MymenuBar(props) {
  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.loginlogoutReducer.isLogin);
  // console.log(`value of isLoggedIn ${isLoggedIn}`)
  // ========================we can Handle page by this function
  const menuItemHandler = (input = "flag") => {
    if (input === "Home") {
      Navigate("/");
    } else {
      Navigate(`${input}`);
    }
    props.menuClose();
    // console.log("menuItemHandler ");
  };
  // ==============================
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //========================================================================================LOGIN PAGE POP UP=====================================
  return (
    <>
      <MenuItem onClick={() => { menuItemHandler("Home") }}>
        <HomeIcon sx={{ fontsize: 3, mr: 1 }} />
        Home
      </MenuItem>
      <MenuItem onClick={() => { menuItemHandler("Discussions") }}>
        <ForumIcon sx={{ fontsize: 3, mr: 1 }} />
        Discussions
      </MenuItem>
      <MenuItem onClick={() => { menuItemHandler("LostFound") }}>
        <SearchIcon sx={{ fontsize: 3, mr: 1 }} />
        Lost&Found
      </MenuItem>
      <MenuItem onClick={handleClick}>
        <CategoryIcon sx={{ fontsize: 3, mr: 1 }} />
        Categories
      </MenuItem>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuBarCategory CategoryClose={props.menuClose} MenuBarClose={handleClose} />
      </StyledMenu>
      <MenuItem onClick={() => {
        (!isLoggedIn && dispatch(SellNowclick(true)));
        (!isLoggedIn && dispatch(modelPopUp(true)));
        (isLoggedIn && menuItemHandler("Sellproduct"));
        props.menuClose();
      }}>
        <SellIcon sx={{ fontsize: 3, mr: 1 }} />
        Sell Now
      </MenuItem>
      {!isLoggedIn && <MenuItem onClick={() => { dispatch(modelPopUp(true)); dispatch(SellNowclick(false)); props.menuClose(); }}>
        <LoginIcon sx={{ fontsize: 3, mr: 1 }} />
        Login
      </MenuItem>}
      {isLoggedIn && <MenuItem onClick={() => {
        window.localStorage.removeItem("auth");
        dispatch(modelPopUp(false));
        dispatch(LogoutUser());
        menuItemHandler();
        if (location.pathname !== "/" && location.pathname !== '/Discussions' && location.pathname !== '/Lost&Found') {
          Navigate("/");
        }
        Navigate("/");
      }}>
        <LogoutIcon sx={{ fontsize: 3, mr: 1 }} />
        Logout
      </MenuItem>}

    </>
  );
}

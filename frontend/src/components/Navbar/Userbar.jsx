import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import { useDispatch } from "react-redux";
import { LogoutUser,modelPopUp } from "../../AStatemanagement/Actions/userActions";
// import InsertEmoticonSharpIcon from "@mui/icons-material/InsertEmoticonSharp";
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Box,
  IconButton,
} from "@mui/material";
function Userbar(props) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const Navigate=useNavigate();
  // ==================================================================== lOGIN ICON ===========================
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            sx={{
              height: { xs: 24, sm: 34 },
              width: { xs: 24, sm: 34 },
              fontSize: { xs: 12, sm: 18 },
              color: "#263238",
              fontWeight: "bold",
            }}
          >
            {/* <InsertEmoticonSharpIcon /> */}
            <PersonIcon/>
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
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
        onClose={handleCloseUserMenu}
      >
        {/* {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))} */}
        <MenuItem onClick={ ()=>{Navigate("/Profile"); handleCloseUserMenu(); } }><AccountCircleIcon sx={{ fontsize: 3, mr: 1 }}/>Profile</MenuItem>
        <MenuItem onClick={()=>{Navigate("/Favourites");handleCloseUserMenu();}}>
        <FavoriteSharpIcon sx={{ fontsize: 3, mr: 1 }} />Favourites
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(LogoutUser());
            // props.onClose();
            window.localStorage.removeItem("auth");
            dispatch(modelPopUp(false));
           Navigate("/");
          }}
        >
          <LogoutIcon sx={{ fontsize: 3, mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Userbar;

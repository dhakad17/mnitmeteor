import React, { useState ,useEffect} from "react";
import Box from "@mui/material/Box";
import { Typography, Paper, Button } from "@mui/material";
import { useSelector } from "react-redux";
import profileIcon from "./profileIcon.svg";
import UpdatePhoneNo from "./UpdateProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ========================================================MAIN FUNCTION=================================================================

export default function ProfilePage(props) {
  // ==========================================================GETTING DETAILS FROM STATE-REDUX =================================================
  //  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.loginlogoutReducer.isLogin);
  //  const token = useSelector((state) => state.loginlogoutReducer.token);
   const userData = useSelector((state) => state.loginlogoutReducer.userData);
  // ==================================================HANDLERS ====================================================================================
  const [openUpdate, setOpenUpdate] = useState(false);
  const notify = (value) => toast(value);
  // const styles = {
  //   transition: "all 4000ms ease-out",
  // };
  useEffect(()=>{
    window.scrollTo(0, 0);
  })
  const updateHandler = () => {
    // setOpenUpdate({ display: "block" });
    setOpenUpdate(!openUpdate);}
  return (
    <div>
      <Paper
        sx={{
          bgcolor: "#5e35b1",
          width: "100%",
          height: "280px",
          borderRadius: 0,
        }}
      ></Paper>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#C8C6C6",
        }}
      >
        <Box
          sx={{
            width: "100%",

            position: "relative",
            display: "flex",
            justifyContent: { xs: "center", sm: "space-between" },
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-end" },
          }}
        >
          <Paper
            sx={{
              width: { xs: "100px", sm: "138px" },
              height: { xs: "100px", sm: "138px" },
              position: "absolute",
              left: { xs: "50", sm: "6rem" },
              top: { xs: "-2.5rem", sm: "-4rem" },
            }}
            elevation={0}
          >
            <img src={profileIcon} alt="profileicon" />
          </Paper>
          <Box
            sx={{
              pt: { xs: 8, sm: 3 },
              pb: { xs: 0, sm: 4 },
              ml: { sm: "15rem", xs: "0" },
            }}
          >
            <Box display="flex" direction="row">
              <Typography variant="body1" fontWeight="bold">
                Email:
              </Typography>
              <Typography variant="body2" sx={{ pt: "0.2rem", px: "1.4rem" }}>
             {userData?.email}
              </Typography>
            </Box>

            <Box display="flex" direction="row" sx={{ pt: 0 }}>
              <Typography variant="body1" fontWeight="bold">
                Phone:
              </Typography>
              <Typography variant="body2" sx={{ pt: "0.2rem", px: "1rem" }}>
               {userData?.Mobile_no}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              mr: { xs: 3.5, md: 12.5 },
              width: { xs: "100%", sm: "auto" },
              display: { xs: "flex", justifyContent: "flex-end" },
            }}
          >
            <Button sx={{ color: "#5e35b1", py: 0.2 }} onClick={updateHandler}>
              {/* update  */}
              {!openUpdate &&"update"}
              {openUpdate&&"cancel"}
            </Button>
          </Box>
        </Box>

        {openUpdate && <UpdatePhoneNo closeUpdate={updateHandler}  notify={notify}/>}
        <ToastContainer />
      </Box>
    </div>
  );
}

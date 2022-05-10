import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/navbar.js";
import Paper from "@mui/material/Paper";
import Model from "../loginForm/Model";
import { useSelector, useDispatch } from "react-redux";
import { modelPopUp } from "../../AStatemanagement/Actions/userActions";
import { ChildrenBox } from "../_Styling/styling";
function Wrapper({ children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.loginlogoutReducer.isLogin);
  const loginModel = useSelector((state) => state.ModelPopUpReducer.popUp);
  const LoginModelHandler = () => {
    dispatch(modelPopUp(false));
  };
  return (
    <>
      <Paper
        sx={{ bgcolor: "#ede7f6", minHeight: "100vh", position: "relative" }}
      >
        <Navbar />
        <ChildrenBox>{children}</ChildrenBox>
        <Footer />
        {!isLoggedIn && loginModel && (
          <Model onClose={LoginModelHandler}></Model>
        )}
      </Paper>
    </>
  );
}

export default Wrapper;

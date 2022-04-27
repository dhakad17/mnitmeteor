import React from "react";
import { Box, Typography, IconButton, Tooltip, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { NotificationCardStyle } from "./notificationStyling";
import NotificationReadMore from "./notificationReadMore";
import { useSelector } from "react-redux";
function NotificationCard({ data ,index}) {
  const localUserData=useSelector((state)=>state.loginlogoutReducer)
  const token=localUserData.token;
  const DeleteHandler = () => {
    console.log("deepak ");
    console.log(index,token);
    // console.log(token)

  };
  // const status = 1;
  const classes = NotificationCardStyle(data.status);
  return (
    <Paper className={classes.cardMainBox}>
      <Box className={classes.indicatorWrapper}>
        <Box className={classes.indicator}></Box>
        <Box className={classes.contentBox}>
          <Box className={classes.headingContainer}>
            <Box className={classes.headingContainer}>
              <Typography className={classes.heading}>
                {data.status === 1
                  ? "Approved"
                  : data.status === -1
                  ? "Decline"
                  : "General"}
              </Typography>
              <Typography sx={{ mx: "10px", fontSize: "12px", mt: "3px" }}>
                26 sep 2020
              </Typography>
            </Box>
            <IconButton sx={{ p: 0.5 }} onClick={DeleteHandler}>
              <Tooltip title="Remove" arrow>
                <ClearIcon fontSize="small" />
              </Tooltip>
            </IconButton>
          </Box>

          <NotificationReadMore words={180} data={data.status}>
            {data.content}
          </NotificationReadMore>
        </Box>
      </Box>
    </Paper>
  );
}

export default NotificationCard;

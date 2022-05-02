import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomeCard from "../Cards/HomeCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Container, Box } from "@mui/material";
import HomeCardSkeleton from "../Cards/HomeCardSkeleton";
import EmptySpace from "../_EmptySpaces/emptySpace";
import { mainPageEmpty } from "../_EmptySpaces/EmptySvg";
import { ModelOutlinedButton } from "./homePageStyling";
function routeChecker(route) {
  const routes = [
    "recommendation",
    "books",
    "cycle",
    "uniform",
    "electronics",
    "others",
  ];
  return routes.some((data) => data === route);
}
function ProductCard(props) {
  const [cardData, setCardData] = useState([]);
  const [pointer, setPointerData] = useState(1);
  const Navigate = useNavigate();
  const params = useParams();
  const category = props.category ? props.category : params.category;
  // const isLoggedIn = useSelector((state) => state.loginlogoutReducer.isLogIn);
  const email = useSelector(
    (state) => state.loginlogoutReducer.userData?.email
  );
  // ==========================================================================================
  const LoadMoreHandler = () => {
    setPointerData((prev) => {
      return prev + 2;
    });
  };
  useEffect(() => {
    let isSubscribed = true;
    const Call = async () => {
      try {
        const cardDetails = await axios.post(`${process.env.REACT_APP_API}/fetch`, {
          category,
          email,
          pointer,
        });
        // console.log(cardDetails.data);
        if (isSubscribed) {
          // console.log(cardDetails.data);
          // setCardData(cardDetails.data);
          console.log("deepak")
          setCardData((prev) => {
            // console.log(prev);
            // console.log(...prev);
            return [...prev, ...cardDetails.data];
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (routeChecker(category)) {
      Call();
    } else {
      Navigate("/*");
    }

    return () => (isSubscribed = false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointer,category]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container
        sx={{
          pt: { xs: 5 },
          pb: { xs: 5 },
          maxWidth: { xs: "100%", sm: "sm", md: "md", lg: "lg" },
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 3, lg: 4 }}>
          {typeof cardData === "undefined"
            ? Array.from(new Array(24)).map((data, index) => {
                return (
                  <Grid item xs={6} md={4} lg={3} key={index}>
                    <HomeCardSkeleton />
                  </Grid>
                );
              })
            : cardData.length > 0
            ? cardData?.map((data, index) => {
                if (data !== null) {
                  return (
                    <Grid item xs={6} md={4} lg={3} key={data._id}>
                      <HomeCard cardData={data} index={index} />
                    </Grid>
                  );
                } else return null;
              })
            : category !== "recommendation" && (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <EmptySpace source={mainPageEmpty[`${category}`]} />
                </Box>
              )}
        </Grid>
      </Container>
      {/* {pointer <=cardData?.length && ( */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <ModelOutlinedButton variant="outlined" onClick={LoadMoreHandler}>
            Load More
          </ModelOutlinedButton>
        </Box>
      {/* )} */}
    </motion.div>
  );
}

export default ProductCard;

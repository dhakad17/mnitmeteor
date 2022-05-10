import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import LostFoundSkeleton from "../lostfoundSkeleton";
import LostFoundCard from "../Lost&FoundCard/L&FCard";
import POPUPElement from "../../ModelPopUP/POPUPElement";
import SuccessfulSubmission from "../../ModelPopUP/onFormSubmission";
import { useSelector, useDispatch } from "react-redux";
import EmptySpace from "../../_EmptySpaces/emptySpace";
import { lostFoundEmpty } from "../../_EmptySpaces/EmptySvg";
import { lnfPopUp } from "../../../AStatemanagement/Actions/userActions";

function LostFoundMyItems({ userAuthData }) {
  const [myItems, setMyItems] = useState();
  const dispatch = useDispatch();
  const submitPopUp = useSelector((state) => state.ModelPopUpReducer.lnfPopUp);
  // const localUserData = JSON.parse(window.localStorage.getItem("auth"));
  // const token = localUserData.token;
  // const isLoggedIn = localUserData.isLogin;
  const { isLogin, token } = userAuthData;
  const SubmitPopUpHandler = () => {
    dispatch(lnfPopUp(false));
  };

  useEffect(() => {
    let isSubscribed = true;
    const axiosPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/lnfmyitems`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (isSubscribed) {
          setMyItems(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    axiosPosts();
    return () => (isSubscribed = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(myItems);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {typeof myItems === "undefined" ? (
        Array.from(new Array(3)).map((data, index) => {
          return <LostFoundSkeleton key={index} />;
        })
      ) : myItems.length ? (
        myItems.map((data) => {
          if (data) {
            return (
              <LostFoundCard
                key={data._id}
                data={data}
                showDelete={true}
                setLostFound={setMyItems}
                flag={4}
              />
            );
          } else {
            return null;
          }
        })
      ) : (
        <EmptySpace source={lostFoundEmpty.myItems} />
      )}
      {submitPopUp && isLogin && (
        <POPUPElement
          open={submitPopUp}
          onClose={SubmitPopUpHandler}
          portelId={"portal"}
        >
          <SuccessfulSubmission onClose={SubmitPopUpHandler}>
            We have received your submission. It will be shown in the feed once approved. 
          </SuccessfulSubmission>
        </POPUPElement>
      )}
    </motion.div>
  );
}

export default LostFoundMyItems;

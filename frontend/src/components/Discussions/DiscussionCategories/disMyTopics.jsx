import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import DiscussionSkeleton from "../discussionSkeleton";
import DiscussionCard from "../DiscussionPage/discussionCard";
import EmptySpace from "../../_EmptySpaces/emptySpace";
import { DiscussionEmpty } from "../../_EmptySpaces/EmptySvg";
import { useSelector, useDispatch } from "react-redux";
import { forumPopUp } from "../../../AStatemanagement/Actions/userActions";
import SuccessfulSubmission from "../../ModelPopUP/onFormSubmission";
import POPUPElement from "../../ModelPopUP/POPUPElement";
export default function DiscussionMyTopics() {
  const [myTopics, setMyTopics] = useState();
  const dispatch = useDispatch();
  const userAuthData = JSON.parse(window.localStorage.getItem("Zuyq!jef@}#e"));
  const token = userAuthData?.xezzi;
  const isLogin = userAuthData?.oamp;
  const submitPopUp = useSelector(
    (state) => state.ModelPopUpReducer.forumPopUp
  );
  const SubmitPopUpHandler = () => {
    dispatch(forumPopUp(false));
  };
  // =================================================================================
  useEffect(() => {
    window.scrollTo(0, 0);
    let isSubscribed = true;
    async function call() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/fetch_own_threads`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (isSubscribed) {
          setMyTopics(response.data.user_specific_threads);
        }
      } catch (err) {
        console.log(err);
      }
    }
    call();
    return () => (isSubscribed = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ====================================================================================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {typeof myTopics === "undefined" ? (
        Array.from(new Array(4)).map((data, index) => {
          return <DiscussionSkeleton key={index} />;
        })
      ) : myTopics.length > 0 ? (
        myTopics.map((data) => {
          if (data) {
            return (
              <DiscussionCard
                showDelete={true}
                key={data._id}
                data={data}
                setThread={setMyTopics}
                flag={3}
              />
            );
          } else {
            return null;
          }
        })
      ) : (
        <EmptySpace source={DiscussionEmpty.myTopics} />
      )}
      {submitPopUp && isLogin && (
        <POPUPElement
          open={submitPopUp}
          onClose={SubmitPopUpHandler}
          portelId={"portal"}
        >
          <SuccessfulSubmission onClose={SubmitPopUpHandler}>
            what is your name my name is dee
          </SuccessfulSubmission>
        </POPUPElement>
      )}
    </motion.div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import DiscussionSkeleton from "../discussionSkeleton";
import DiscussionCard from "../DiscussionPage/discussionCard";
import EmptySpace from "../../_EmptySpaces/emptySpace";
import { DiscussionEmpty } from "../../_EmptySpaces/EmptySvg";

function DiscussionSavedTopics() {
  const [savedTopics, setSavedTopics] = useState();
  const localUserData = JSON.parse(window.localStorage.getItem("auth"));
  const token = localUserData.token;
  // console.log(token);
  // console.log(localUserData);
  useEffect(() => {
    let isSubscribed = true;
    const call = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/send_saved_threads",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (isSubscribed) {
          setSavedTopics(response.data);
          console.log(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    call();
    return () => (isSubscribed = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {typeof savedTopics === "undefined" ? (
        Array.from(new Array(4)).map((data, index) => {
          return <DiscussionSkeleton key={index} />;
        })
      ) : savedTopics.length > 0 ? (
        savedTopics.map((data, index) => {
          if (data) {
            return (
              <DiscussionCard
                key={index}
                data={data}
                setThread={setSavedTopics}
                flag={2}
              />
            );
          } else {
            return null;
          }
        })
      ) : (
        <EmptySpace source={DiscussionEmpty.savedTopics}/>
      
      )}
    </>
  );
}

export default DiscussionSavedTopics;

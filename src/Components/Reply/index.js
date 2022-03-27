import moment from "moment";
import React, { useContext, useState } from "react";
import { dataContext } from "../../App";
import "./reply.scss";
function Reply({ id, replyTo, closeReply }) {
  const { comment, user, fetchLocalData } = useContext(dataContext);
  const [error, setError] = useState(false);
  const [reply, setReply] = useState(replyTo && `@${replyTo},`);

  const handleInput = (event) => {
    console.log(event.target.value);
    if (event.target.value) {
      setError(false);
    }
    setReply(event.target.value);
  };
  const handleReply = () => {
    if (reply) {
      // console.log(reply);
      if (id === 0) {
        let addComment = {
          id: Date.now(),
          content: reply.replace(`@${replyTo},`, ""),
          createdAt: "just now",
          score: Math.floor(Math.random() * 10),
          user: {
            image: {
              png: user.image.png,
              webp: user.image.png,
            },
            username: user.username,
          },
          replies: [],
        };
        comment.push(addComment);
        localStorage.clear();
        localStorage.setItem("data", JSON.stringify(comment));
        localStorage.setItem("user", JSON.stringify(user));
        setReply("");
        fetchLocalData();
      } else {
        let addReply = {
          id: Date.now(),
          content: reply.replace(`@${replyTo},`, ""),
          createdAt: "just now",
          score: Math.floor(Math.random() * 10),
          replyingTo: replyTo,
          user: {
            image: {
              png: user.image.png,
              webp: user.image.png,
            },
            username: user.username,
          },
        };
        let addReplies = comment.map((item) =>
          item.id === id
            ? { ...item, replies: [...item.replies, addReply] }
            : item
        );
        console.log(addReplies);
        localStorage.clear();
        localStorage.setItem("data", JSON.stringify(addReplies));
        localStorage.setItem("user", JSON.stringify(user));
        setReply("");
        fetchLocalData();
        closeReply(false);
      }
    } else {
      setError(true);
    }
  };

  console.log(user);
  return (
    <section className="reply_wrapper p-4 row mt-5">
      <div className="reply_by_img col-1">
        <img src={user.image.png} alt="reply by the person" />
      </div>
      <div className="col-9 reply_input">
        <textarea
          name="reply"
          className={error ? "error" : null}
          onChange={handleInput}
          value={reply}
          placeholder={replyTo ? `@${replyTo},` : "Add a comment.."}
          autoFocus
        ></textarea>
      </div>
      <div className="col-2 reply_send d-flex justify-content-end align-items-start replyBtnWrapper">
        <button onClick={handleReply}>{replyTo ? "Reply" : "Send"}</button>
      </div>
    </section>
  );
}

export default Reply;

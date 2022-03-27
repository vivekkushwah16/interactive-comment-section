import React, { useState } from "react";
import "./comments.scss";
import Reply from "../Reply";
function Comments({ content, img, score,userName,time,replyTo ,id}) {
  const [reply, setReply] = useState();
  return (
    <>
      <section className="commentsWrapper  p-4 row justify-content-between">
        <div className="col-1 h-100   d-flex align-align-items-start scoreCol">
          <div className=" w-75 score_wrapper d-flex align-items-center flex-column justify-content-evenly">
            <div className="plus_btn" role="button">
              <span className="icon-icon-plus"></span>
            </div>
            <h2 className="m-0 ">{score}</h2>
            <div className="minus_btn " role="button">
              <span className="icon-icon-minus"></span>
            </div>
          </div>
        </div>
        <div className="col-11 row m-0 ps-2  comment_details  ">
          <div className="col-8 d-flex gx-2 comment_details_author ">
            <img src={img} alt="author of the comment" />
            <div className="d-flex align-items-center ms-3">
              <h1 className="m-0">{userName}</h1>
              {/* <p className="m-0 ms-3 comment_by">you</p> */}
              <p className="m-0 ms-3 comment_timing">{time}</p>
            </div>
          </div>
          <div className="col-4  d-flex align-items-center comment_details_author btnWrapper justify-content-end">
            <div
              className="action_btn d-flex align-items-center me-4"
              role="button"
              onClick={() => {
                setReply(true);
              }}
            >
              <span className="icon-icon-reply me-2 "></span>
              <p>Reply</p>
            </div>
            {/* <div
            className="action_btn delete_btn d-flex align-items-center me-4"
            role="button"
          >
            <span className="icon-icon-delete me-2 "></span>
            <p>Delete</p>
          </div>
          <div className="action_btn  d-flex align-items-center" role="button">
            <span className="icon-icon-edit me-2 "></span>
            <p>Edit</p>
          </div> */}
          </div>
          <div className="col-12  gx-2 comment">
            <p className="m-0">
              {replyTo && <span>{`@${replyTo} `}</span>}
              {content}
            </p>
          </div>
        </div>
      </section>
      {reply && <Reply id={id} replyTo={userName}  closeReply={setReply}/>}
    </>
  );
}

export default Comments;

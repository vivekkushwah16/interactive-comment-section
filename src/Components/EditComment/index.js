import React, { useState, useContext } from "react";
import { dataContext } from "../../App";
import "../Comments/comments.scss";
import Modal from "../Modal";
function EditComment({
  content,
  img,
  score,
  userName,
  time,
  replyTo,
  id,
  parentId,
}) {
  const { comment, user } = useContext(dataContext);
  const [error, setError] = useState(false);
  const [contentEdit, setContentEdit] = useState(content);
  const [enableEditing, setEnableEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleInput = (event) => {
    console.log(event.target.value);
    if (event.target.value) {
      setError(false);
      setContentEdit(event.target.value);
    }
    if (event.target.value === "") {
      setContentEdit("");
    }
  };
  const handleUpdating = () => {
    if (contentEdit) {
      let updatedComments;
      if (parentId === 0) {
        updatedComments = comment.map((item) =>
          item.id === id ? { ...item, content: contentEdit } : item
        );
        console.log(updatedComments);
        // let updatedComments = comment.filter((item) => item.id !== id);
        // updatedComments.push({ ...updateContent, content: contentEdit });
      } else {
        //first map for replies and second for comment
        updatedComments = comment.map((item) =>
          item.id === parentId
            ? item.replies.map((item) =>
                item.id === id ? { ...item, content: contentEdit } : item
              )
            : item
        );
      }
      localStorage.clear();
      localStorage.setItem("data", JSON.stringify(updatedComments));
      localStorage.setItem("user", JSON.stringify(user));
      setEnableEditing(false);
    } else {
      setError(true);
    }
  };
  
  return (
    <>
      <section className="commentsWrapper p-4 row justify-content-between ">
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
        <div className="col-11 row m-0 ps-2  comment_details ">
          <div className="col-8 d-flex gx-2 comment_details_author ">
            <img src={img} alt="author of the comment" />
            <div className="d-flex align-items-center ms-3">
              <h1 className="m-0">{userName}</h1>
              <p className="m-0 ms-3 comment_by">you</p>
              <p className="m-0 ms-3 comment_timing">{time}</p>
            </div>
          </div>
          <div className="col-4 comment_details_author  d-flex align-items-center btnWrapper justify-content-end">
            {/* <div
            className="action_btn d-flex align-items-center me-4"
            role="button"
          >
            <span className="icon-icon-reply me-2 "></span>
            <p>Reply</p>
          </div> */}
            <div
              className="action_btn delete_btn d-flex align-items-center me-4"
              role="button"
              onClick={() => setShowModal(true)}
            >
              <span className="icon-icon-delete me-2 "></span>
              <p>Delete</p>
            </div>
            <div
              className="action_btn  d-flex align-items-center  "
              role="button"
              onClick={() => setEnableEditing(true)}
            >
              {/* <span className="icon-icon-delete me-2 "></span> */}
              <span className="icon-icon-edit me-2 "></span>
              <p>Edit</p>
            </div>
          </div>
          <div className="col-12  gx-2 comment">
            {enableEditing ? (
              <div className="mt-4">
                <textarea
                  name="reply"
                  className={error ? "error" : null}
                  onChange={handleInput}
                  value={contentEdit}
                  placeholder="Add a comment.."
                  autoFocus
                ></textarea>

                <div className=" reply_send d-flex justify-content-end align-items-start mt-3">
                  <button onClick={handleUpdating}>Update</button>
                </div>
              </div>
            ) : (
              <p className="m-0">
                {replyTo && <span>{`@${replyTo} `}</span>}
                {contentEdit}
              </p>
            )}
          </div>
        </div>
      </section>
      {showModal && (
        <Modal parentId={parentId} id={id} setShowModal={setShowModal} />
      )}
    </>
  );
}

export default EditComment;

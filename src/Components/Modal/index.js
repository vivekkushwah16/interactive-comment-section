import React, { useContext } from "react";
import { dataContext } from "../../App";
import ReactDOM from "react-dom";
import "./modal.scss";
const Backdrop = ({ id, parentId, setShowModal }) => {
  const { comment, user, fetchLocalData } = useContext(dataContext);
  function handleRemoveData() {
    let removeComments;
    if (parentId === 0) {
      removeComments = comment.filter((item) => item.id !== id);
      console.log(removeComments);
    } else {
      //first map for replies and second for comment
      removeComments = comment.map((item) =>
        item.id === parentId
          ? {...item,replies:item.replies.filter((item) => item.id !== id)}
          : item
      );
      console.log(removeComments);
    }
    localStorage.clear();
    localStorage.setItem("data", JSON.stringify(removeComments));
    localStorage.setItem("user", JSON.stringify(user));
    fetchLocalData();
    setShowModal(false);
  }
  return (
    <section className="modal_wrapper h-100 position-fixed d-flex justify-content-center align-items-center">
      <article className="modal_container p-5">
        <h1 className="mb-4">Delete comment</h1>
        <p className="mb-4">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="modal_actionBtn d-flex justify-content-between">
          <button className="cancel_btn " onClick={() => setShowModal(false)}>
            NO, CANCEL
          </button>
          <button onClick={handleRemoveData}>YES, DELETE</button>
        </div>
      </article>
    </section>
  );
};
function Modal({ id, parentId, setShowModal }) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop parentId={parentId} id={id} setShowModal={setShowModal} />,
        document.getElementById("modal")
      )}
    </>
  );
}

export default Modal;

import { createContext, useEffect, useState } from "react";
import "./App.css";
import Comments from "./Components/Comments";
import EditComment from "./Components/EditComment";
import Reply from "./Components/Reply";

export const dataContext = createContext();
function App() {
  const [comment, setComment] = useState([]);
  const [user, setUser] = useState({
    image: {
      png: null,
    },
    username: null,
  });

  function fetchData() {
    fetch("./data/data.json").then((Response) => {
      console.log(Response);
      Response.json().then((res) => {
        setComment(res.comments);
        setUser(res.currentUser);
        localStorage.setItem("data", JSON.stringify(res.comments));
        localStorage.setItem("user", JSON.stringify(res.currentUser));
        console.log(res);
      });
    });
  }

  function fetchLocalData() {
    const comments = JSON.parse(localStorage.getItem("data"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (comments && user) {
      setComment(comments);
      setUser(user);
    } else {
      fetchData();
    }
  }
  useEffect(() => {
    fetchLocalData();
  }, []);

  return (
    <dataContext.Provider value={{ comment, user, fetchLocalData }}>
      <div className="App w-100 d-flex flex-column align-items-center p-5">
        {comment.length > 0 &&
          comment.map((item) => (
            <div key={item.id} className="commentContainer">
              <div className="comments">
                {item.user.username === user.username ? (
                  <EditComment
                    parentId={0}
                    id={item.id}
                    content={item.content}
                    time={item.createdAt}
                    userName={item.user.username}
                    score={item.score}
                    img={item.user.image.png}
                    replyTo={item.replyingTo}
                  />
                ) : (
                  <Comments
                    id={item.id}
                    content={item.content}
                    time={item.createdAt}
                    userName={item.user.username}
                    score={item.score}
                    img={item.user.image.png}
                    replyTo={item.replyingTo}
                  />
                )}
              </div>
              <div
                className={`d-flex flex-column align-items-end ${
                  item.replies.length > 0 ? "my-5" : "mb-5"
                }`}
              >
                <div className="replies d-flex flex-column align-items-end gap-5">
                  {item.replies.length > 0 &&
                    item.replies.map((elm) => (
                      <div key={elm.id}>
                        {elm.user.username === user.username ? (
                          <EditComment
                            parentId={item.id}
                            id={elm.id}
                            content={elm.content}
                            time={elm.createdAt}
                            userName={elm.user.username}
                            score={elm.score}
                            img={elm.user.image.png}
                            replyTo={elm.replyingTo}
                          />
                        ) : (
                          <Comments
                            id={item.id}
                            content={elm.content}
                            time={elm.createdAt}
                            userName={elm.user.username}
                            score={elm.score}
                            img={elm.user.image.png}
                            replyTo={elm.replyingTo}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        <div className="addComments">{user && <Reply id={0} />}</div>
      </div>
    </dataContext.Provider>
  );
}

export default App;

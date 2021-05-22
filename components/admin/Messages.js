import { useState } from "react";
import { BASE_URL } from "../../settings/api";
import axios from "axios";

const Messages = ({ data }) => {
  const update = async (id) => {
    try {
      await axios.put(BASE_URL + "/messages/" + id, { read: true });
    } catch (error) {
      console.log("error", error);
    }
  };

  function openMesssage(element, id) {
    const message = element.parentElement.querySelector(".Messages__message");
    const btnImg = element.querySelector(".Messages__btn-img");
    message.classList.toggle("Messages__message--open");
    element.classList.remove("Messages__btn--unread");
    element.classList.add("Messages__btn--read");
    btnImg.classList.toggle("Messages__btn-img--open");
    update(id);
  }

  function readMessage(data) {
    if (data === true) {
      return "Messages__btn Messages__btn--read";
    } else {
      return "Messages__btn Messages__btn--unread";
    }
  }
  return (
    <>
      <div className="Messages">
        <h1 className="Messages__heading">Lastest Messages</h1>
        {data.map((data) => {
          return (
            <div key={data.id} className="Messages__wrapper">
              <button
                onClick={(event) => openMesssage(event.currentTarget, data.id)}
                className={readMessage(data.read)}
              >
                <span className="Messages__btn-text">
                  {"Subject: " + data.subject}
                </span>
                <img
                  src="/arrow.svg"
                  alt="arrow-icon"
                  className="Messages__btn-img"
                />
              </button>
              <div className="Messages__message">
                <div className="Messages__message-inner">
                  <p className="Messages__message-info">
                    Sender:
                    <span className="Messages__message-detail">
                      {" " + data.email}
                    </span>
                  </p>
                  <p className="Messages__message-info">
                    From:
                    <span className="Messages__message-detail">
                      {" " + data.firstName + " " + data.lastName}
                    </span>
                  </p>
                  <p className="Messages__message-info">
                    Subject:
                    <span className="Messages__message-detail">
                      {" " + data.subject}
                    </span>
                  </p>

                  <p className="Messages__message-content">{data.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Messages;

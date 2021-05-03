import { useState } from "react";
import { BASE_URL } from "../settings/api";
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
    const message = element.parentElement.querySelector(".messages__message");
    message.classList.toggle("messages__message--open");
    element.classList.remove("messages__message-btn--unread");
    element.classList.add("messages__message-btn--read");
    update(id);
  }

  function readMessage(data) {
    if (data === true) {
      return "messages__message-btn messages__message-btn--read";
    } else {
      return "messages__message-btn messages__message-btn--unread";
    }
  }
  return (
    <>
      <div className="messages">
        <h1 className="messages__heading">Lastest Messages</h1>
        {data.map((data) => {
          return (
            <div key={data.id} className="messages__wrapper">
              <button
                onClick={(event) => openMesssage(event.currentTarget, data.id)}
                className={readMessage(data.read)}
              >
                <span className="messages__info">
                  <span className="messages__info--bold">From:</span>{" "}
                  {data.firstName + " " + data.lastName}
                </span>
                <span className="messages__info">
                  <span className="messages__info--bold">Subject:</span>{" "}
                  {data.subject}
                </span>
                <span className="messages__info">
                  <span className="messages__info--bold">message:</span>{" "}
                  {data.message}
                </span>
              </button>
              <div className="messages__message">
                <div className="messages__message-inner">
                  <p className="messages__message-info">
                    <span className="messages__message-info--bold">
                      Sender:
                    </span>
                    {data.email}
                  </p>
                  <p className="messages__message-info">
                    <span className="messages__message-info--bold">From:</span>
                    {data.firstName + " " + data.lastName}
                  </p>
                  <p className="messages__message-info">
                    <span className="messages__message-info--bold">
                      Subject:
                    </span>
                    {data.subject}
                  </p>
                  <p className="messages__message-info">{data.message}</p>
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

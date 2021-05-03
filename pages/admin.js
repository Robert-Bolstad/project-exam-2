import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Messages from "../components/Messages";
import Enquiries from "../components/Enquiries";
import Establishments from "../components/Establishments";
import { BASE_URL } from "../settings/api";
import axios from "axios";

export default function admin({ messages }) {
  const [auth] = useContext(AuthContext);
  const router = useRouter();

  function navigate(thisBtn, page) {
    const enquiries = document.querySelector(".admin__enquiries");
    const messages = document.querySelector(".admin__messages");
    const establishments = document.querySelector(".admin__establishments");
    const btns = document.querySelectorAll(".admin__btn");
    enquiries.style.display = "none";
    messages.style.display = "none";
    establishments.style.display = "none";
    btns.forEach((btn) => {
      btn.classList.remove("admin__btn--active");
    });
    thisBtn.classList.toggle("admin__btn--active");
    switch (page) {
      case "enquiries":
        enquiries.style.display = "block";
        break;
      case "messages":
        messages.style.display = "block";

        break;
      case "establishments":
        establishments.style.display = "block";
        break;
      default:
      // code block
    }
  }
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  });

  return (
    <Layout>
      <Head title="Admin" />
      <main className="admin">
        <div className="admin__container">
          <div className="admin__navigation">
            <button
              className="admin__btn"
              onClick={(event) => navigate(event.currentTarget, "enquiries")}
            >
              Enquiries
            </button>
            <button
              className="admin__btn"
              onClick={(event) => navigate(event.currentTarget, "messages")}
            >
              Messages
            </button>
            <button
              className="admin__btn"
              onClick={(event) =>
                navigate(event.currentTarget, "establishments")
              }
            >
              Establishments
            </button>
          </div>
          <div className="admin__section">
            <div className="admin__enquiries">
              <Enquiries />
            </div>
            <div className="admin__messages">
              <Messages data={messages} />
            </div>
            <div className="admin__establishments">
              <Establishments />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  let messages = [];

  try {
    const response = await axios.get(BASE_URL + "/messages");

    messages = response.data;
    console.log(messages);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      messages: messages,
    },
  };
}

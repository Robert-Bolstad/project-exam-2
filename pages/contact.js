import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import ReactMapGL, { Marker } from "react-map-gl";
import { useState } from "react";

const contact = () => {
  const [viewport, setViewport] = useState({
    latitude: 60.392494,
    longitude: 5.325134,
    width: "100%",
    height: "100%",
    zoom: 11,
  });
  return (
    <Layout>
      <Head title="Contact" />
      <main className="contact">
        <h1 className="contact__heading">
          Contact <span className="contact__heading--highlight">Us</span>
        </h1>
        <ContactForm />
        <ContactInfo />
        <div className="contact__map">
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={
              "pk.eyJ1IjoibW9udHJvbmFzIiwiYSI6ImNrbnNtZjVoczEwY20ydm8xaThtMnh2MjcifQ.0KHG1t-eIqrmTkZlIDbULA"
            }
            onViewportChange={(viewport) => {
              setViewport(viewport);
            }}
          >
            <Marker latitude={60.392494} longitude={5.325134}>
              <div className="contact__map-marker"></div>
            </Marker>
          </ReactMapGL>
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export default contact;

import ReactMapGL, { Marker } from "react-map-gl";
import { useState, useEffect } from "react";

const ContactMap = (props) => {
  const [viewport, setViewport] = useState({
    latitude: props.lat,
    longitude: props.long,
    width: "100%",
    height: "100%",
    zoom: 10,
  });

  useEffect(() => {
    window.onresize = doResize;
    function doResize() {
      setViewport({
        ...viewport,
        latitude: props.lat,
        longitude: props.long,
        width: "100%",
        height: "100%",
        zoom: 10,
      });
    }
  }, [viewport]);

  return (
    <div className={props.map}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={
          "pk.eyJ1IjoibW9udHJvbmFzIiwiYSI6ImNrbnNtZjVoczEwY20ydm8xaThtMnh2MjcifQ.0KHG1t-eIqrmTkZlIDbULA"
        }
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <Marker latitude={props.lat} longitude={props.long}>
          <div className={props.marker}></div>
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default ContactMap;

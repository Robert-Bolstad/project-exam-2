import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "../settings/api";

const ResultMap = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 60.391262,
    longitude: 5.322054,
    width: "100%",
    height: "100%",
    zoom: 11,
  });

  useEffect(() => {
    window.onresize = doALoadOfStuff;
    function doALoadOfStuff() {
      console.log("resize");
      setViewport({
        ...viewport,
        latitude: 60.391262,
        longitude: 5.322054,
        width: "100%",
        height: "100%",
        zoom: 11,
      });
    }
  }, [viewport]);

  const [selectedMarker, setSelectedMarker] = useState(null);
  return (
    <div className="map">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={
          "pk.eyJ1IjoibW9udHJvbmFzIiwiYSI6ImNrbnNtZjVoczEwY20ydm8xaThtMnh2MjcifQ.0KHG1t-eIqrmTkZlIDbULA"
        }
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {props.props.map((establishment) => (
          <Marker
            key={establishment.id}
            latitude={establishment.geometry.latitude}
            longitude={establishment.geometry.longitude}
          >
            <button
              className="map__marker"
              onClick={(e) => {
                e.preventDefault();
                setSelectedMarker(establishment);
              }}
            ></button>
          </Marker>
        ))}
        {selectedMarker ? (
          <Popup
            latitude={selectedMarker.geometry.latitude}
            longitude={selectedMarker.geometry.longitude}
            onClose={() => {
              setSelectedMarker(null);
            }}
          >
            <div className="map__info">
              <div className="map__img">
                <Image
                  src={BASE_URL + selectedMarker.image[0].url}
                  width="auto"
                  height="80px"
                  alt="image of establishment"
                />
              </div>
              <h4 className="map__name">{selectedMarker.name}</h4>
              <p className="map__price">${selectedMarker.price}</p>
              <Link href={`/detail/${selectedMarker.id}`}>
                <a className="map__link">Visit page</a>
              </Link>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default ResultMap;

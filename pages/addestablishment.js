import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EstablishmentDetails from "../components/admin/addEstablishment/EstablishmentDetails";
import AddAmenities from "../components/admin/addEstablishment/AddAmenities";
import AddRooms from "../components/admin/addEstablishment/AddRooms";
import { BASE_URL } from "../settings/api";
import axios from "axios";

export default function addEstablishment() {
  const [auth] = useContext(AuthContext);
  const router = useRouter();
  const [hotelImage, setHotelImage] = useState(null);
  const [details, setDetails] = useState(null);
  const [amenitiesList, setAmenitiesList] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [reload, setReload] = useState(false);

  const [submitting, setSubmiting] = useState(false);

  useEffect(() => {
    if (
      hotelImage !== null &&
      amenitiesList !== null &&
      details !== null &&
      rooms !== null &&
      submitting === true
    ) {
      handleUpload();
    } else {
      setReload(true);
    }
  }, [hotelImage, details, amenitiesList, rooms, submitting]);

  useEffect(() => {
    if (
      hotelImage !== null &&
      amenitiesList !== null &&
      details !== null &&
      rooms !== null &&
      submitting === true
    ) {
      handleUpload();
    }
  }, [reload]);

  function getHotelImage(imgfile) {
    setHotelImage(imgfile);
  }

  function getDetails(details) {
    setDetails(details);
  }

  function getAmenities(amenities) {
    setAmenitiesList(amenities);
  }

  function getRooms(room) {
    setRooms(room);
  }
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  });

  const handleUpload = () => {
    let main = [];
    let families = [];
    let area = [];
    let highlights = [];
    let prices = [];

    rooms.forEach((price) => {
      prices.push(price.price);
    });
    amenitiesList[0].forEach((item) => {
      main.push(item.amenitie);
    });
    amenitiesList[1].forEach((item) => {
      families.push(item.amenitie);
    });
    amenitiesList[2].forEach((item) => {
      area.push(item.amenitie);
    });
    const selected = amenitiesList[0].filter((item) => item.selected === true);

    selected.forEach((item) => {
      highlights.push(item.amenitie);
    });

    const minPrice = Math.min(...prices);

    const amenities = {
      amenities: { main: main, families: families, area: area },
    };
    const Accommodation_highlights = {
      accommodation_highlights: {
        highlights: highlights,
      },
    };

    const geometry = {
      geometry: {
        latitude: Number(details.latitude),
        longitude: Number(details.longitude),
      },
    };

    const generalData = {
      name: details.name,
      description: details.description,
      price: minPrice,
      featured: details.featured,
      category: details.category,
      email: details.email,
      phone: details.phone,
      address: details.address,
    };

    const roomData = { rooms: rooms };

    const data = Object.assign(
      generalData,
      amenities,
      geometry,
      Accommodation_highlights,
      roomData
    );

    axios
      .post(BASE_URL + "/establishments", data)
      .then((res) => {
        console.log(res);
        return res.data.id;
      })
      .then((refId) => {
        const imageData = new FormData();
        imageData.append("files", hotelImage);
        imageData.append("refId", refId);
        imageData.append("field", "image");
        imageData.append("ref", "establishments");
        return axios.post(BASE_URL + "/upload", imageData);
      })
      .then((res) => {
        console.log(res);
        alert("You successfully uploaded");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitForm = () => {
    const detailsForm = document.querySelector(".EstablishmentDetails__submit");
    const amenitiesForm = document.querySelector(".AddAmenities__submit");
    const roomsForm = document.querySelector(".AddRooms__submit-rooms");

    detailsForm.click();
    amenitiesForm.click();
    roomsForm.click();

    setSubmiting(true);
  };

  return (
    <Layout>
      <Head title="Add Establishment" />
      <main className="AddEstablishment">
        <div className="AddEstablishment__wrapper">
          <h1 className="AddEstablishment__heading">Add Establishment</h1>
          <section className="AddEstablishment__section">
            <EstablishmentDetails
              getHotelImage={getHotelImage}
              getDetails={getDetails}
            />
          </section>
          <section className="AddEstablishment__AddAmenities">
            <AddAmenities getAmenities={getAmenities} />
          </section>
          <section className="AddEstablishment__section">
            <AddRooms getRooms={getRooms} />
          </section>

          <div className="AddEstablishment__btn-wrapper">
            <button
              className="AddEstablishment__btn"
              type="button"
              onClick={submitForm}
            >
              Add Establishment
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}

import Head from "../../components/layout/Head";
import Layout from "../../components/layout/Layout";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EstablishmentDetails from "../../components/admin/addEstablishment/EstablishmentDetails";
import AddAmenities from "../../components/admin/addEstablishment/AddAmenities";
import AddRooms from "../../components/admin/addEstablishment/AddRooms";
import { BASE_URL } from "../../settings/api";
import axios from "axios";

export default function edit({ establishment }) {
  const [auth] = useContext(AuthContext);
  const router = useRouter();
  const [hotelImage, setHotelImage] = useState(null);
  const [details, setDetails] = useState(null);
  const [amenitiesList, setAmenitiesList] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [reload, setReload] = useState(false);
  const [submitting, setSubmiting] = useState(false);
  const [trySubmitting, setTrySubmiting] = useState(false);

  useEffect(() => {
    if (
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
    setTrySubmiting(true);
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

    let roomsInfo = rooms;

    roomsInfo.forEach((room) => {
      let quantity = [];
      let i;
      for (i = 1; i < room.quantity + 1; i++) {
        quantity.push(i);
      }
      room.quantity = quantity;
    });

    const roomData = { rooms: roomsInfo };

    const data = Object.assign(
      generalData,
      amenities,
      geometry,
      Accommodation_highlights,
      roomData
    );

    const imageId = establishment.image[0].id;

    if (hotelImage === null) {
      axios
        .put(BASE_URL + "/establishments/" + establishment.id, data)
        .then((res) => {
          console.log(res);
        })
        .then((res) => {
          console.log(res);
          alert("Update Success");
          setTrySubmiting(false);
          setSubmiting(false);
          router.push("/admin");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .delete(BASE_URL + "/upload/files/" + imageId)
        .then((res) => {
          console.log(res);
        })
        .then(() => {
          axios.put(BASE_URL + "/establishments/" + establishment.id, data);
        })
        .then(() => {
          const imageData = new FormData();
          imageData.append("files", hotelImage);
          imageData.append("refId", establishment.id);
          imageData.append("field", "image");
          imageData.append("ref", "establishments");
          return axios.post(BASE_URL + "/upload", imageData);
        })
        .then((res) => {
          console.log(res);
          alert("Update Success");
          setTrySubmiting(false);
          setSubmiting(false);
          router.push("/admin");
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
      <Head title="Edit Establishment" />
      <main className="AddEstablishment">
        <div className="AddEstablishment__wrapper">
          <h1 className="AddEstablishment__heading">Edit Establishment</h1>
          <section className="AddEstablishment__section">
            <EstablishmentDetails
              editData={establishment}
              getHotelImage={getHotelImage}
              getDetails={getDetails}
            />
          </section>
          <section className="AddEstablishment__AddAmenities">
            <AddAmenities
              getAmenities={getAmenities}
              editData={establishment}
            />
          </section>
          <section className="AddEstablishment__section">
            <AddRooms getRooms={getRooms} editData={establishment} />
          </section>

          <div className="AddEstablishment__btn-wrapper">
            <button
              className="AddEstablishment__btn"
              type="button"
              disabled={trySubmitting}
              onClick={submitForm}
              style={trySubmitting ? { opacity: "0.7" } : null}
            >
              {trySubmitting ? "Submitting" : "Edit Establishment"}
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(BASE_URL + "/establishments");
    const establishments = response.data;

    const paths = establishments.map((establishment) => ({
      params: { id: establishment.id.toString() },
    }));

    return { paths: paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const url = `${BASE_URL + "/establishments"}/${params.id}`;

  let establishment = null;

  try {
    const response = await axios.get(url);
    establishment = response.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { establishment: establishment },
  };
}

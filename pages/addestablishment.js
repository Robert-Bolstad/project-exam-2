import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../settings/api";
import Image from "next/image";
import AmenitiesList from "../components/addAmenities/AmenitiesList";
import AmenitiesForm from "../components/addAmenities/AmenitiesForm";

export default function addEstablishment() {
  const [auth] = useContext(AuthContext);
  const router = useRouter();
  const [geometry, setGeometry] = useState(null);
  const [highlights, setHighlights] = useState(null);
  const [contact, setContact] = useState(null);
  const [Amenities, setAmenities] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [todos, setTodos] = useState([]);
  const [mainAmenities, setMainAmenities] = useState([]);
  const [familyAmenities, setFamilyAmenities] = useState([]);
  const [areaAmenities, setAreaAmenities] = useState([]);

  const LOCAL_STORAGE_KEY = "react-todos-list-todos";

  function addMainAmenities(amenities) {
    setMainAmenities([amenities, ...mainAmenities]);
  }
  function addFamilyAmenities(amenities) {
    setFamilyAmenities([amenities, ...familyAmenities]);
  }
  function addAreaAmenities(amenities) {
    setAreaAmenities([amenities, ...areaAmenities]);
  }

  function removeMainAmenities(id) {
    setMainAmenities(mainAmenities.filter((item) => item.id !== id));
  }

  function removeFamilyAmenities(id) {
    setFamilyAmenities(familyAmenities.filter((item) => item.id !== id));
  }

  function removeAreaAmenities(id) {
    setAreaAmenities(areaAmenities.filter((item) => item.id !== id));
  }

  // useEffect(() => {
  //   // fires when app component mounts to the DOM
  //   const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (storageTodos) {
  //     setTodos(storageTodos);
  //   }
  // }, []);

  // useEffect(() => {
  //   // fires when todos array gets updated
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  // }, [todos]);

  const defaultImage = "/placeholder.jpg";

  const [previewImage, setPreviewImage] = useState(defaultImage);
  const [file, setFile] = useState();
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  });

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(defaultImage);
    }
  }, [file]);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    accomodationName: yup
      .string()
      .required("* Please enter the name of the hotel")
      .min(3, "* The name must be at least 3 characters"),

    description: yup
      .string()
      .required("* Please enter an description of your accommodation")
      .min(50, "* The description must be at least 50 characters"),

    address: yup
      .string()
      .required("* Please enter the  full address of your location"),

    category: yup
      .string()
      .oneOf(
        ["hotel", "bed_and_breakfast"],
        "* Please select select an accommodation type"
      )
      .required("* Please select your accommodation type"),

    phone: yup
      .string()
      .required("* Please enter your phone number")
      .matches(phoneRegExp, "* Invalid phone number."),

    email: yup
      .string()
      .required("* Please enter an email address")
      .email("* Please enter a valid email address"),

    subject: yup
      .string()
      .required("* Please enter your last name")
      .min(4, "* Subject must be at least 4 characters"),
  });

  function successHtml() {
    return (
      <>
        <p>Message sendt</p>
        <div className="contact-form__check-img">
          <Image src="/check.svg" width="12" height="12" alt="check icon" />
        </div>
      </>
    );
  }

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      const response = await axios.post(BASE_URL + "/establishment", data);
      console.log(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setSubmitting(false);
      setSuccess(successHtml());
    }
  };

  const imageFileHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const handleClick = () => {
    document.querySelector(".AddEstablishment__addfile").click();
  };

  return (
    <Layout>
      <Head title="Add Establishment" />
      <main className="AddEstablishment">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="AddEstablishment__form"
        >
          <div className="AddEstablishment__success">{success}</div>
          <fieldset
            className="AddEstablishment__fieldset"
            disabled={submitting}
          >
            <div className="AddEstablishment__wrapper">
              <div className="AddEstablishment__group">
                <Image
                  src={previewImage}
                  width="500px"
                  height="400px"
                  alt="Display image"
                />
                <button
                  onClick={handleClick}
                  className="AddEstablishment__addfile-btn"
                >
                  Choose image
                </button>
                <input
                  className="AddEstablishment__addfile"
                  type="file"
                  onChange={imageFileHandler}
                />
              </div>

              <div className="AddEstablishment__group">
                <label
                  className="AddEstablishment__label"
                  htmlFor="AddEstablishment__input--name"
                >
                  Accomodation name
                </label>
                <input
                  ref={register}
                  className="AddEstablishment__input AddEstablishment__input--name"
                  type="text"
                  name="accomodationName"
                  id="AddEstablishment__input--name"
                />
                {errors.accomodationName && (
                  <span className="AddEstablishment__error-message">
                    {errors.accomodationName.message}
                  </span>
                )}
              </div>
              <div className="AddEstablishment__group">
                <label
                  className="AddEstablishment__label"
                  htmlFor="AddEstablishment__email"
                >
                  Email
                </label>
                <input
                  className="AddEstablishment__email AddEstablishment__input"
                  name="email"
                  ref={register}
                  type="text"
                />
                {errors.email && (
                  <span className="AddEstablishment__error-message">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="AddEstablishment__group">
                <label
                  className="AddEstablishment__label"
                  htmlFor="AddEstablishment__phone"
                >
                  Phone
                </label>
                <input
                  className="AddEstablishment__phone AddEstablishment__input"
                  name="phone"
                  ref={register}
                  type="text"
                />
                {errors.phone && (
                  <span className="AddEstablishment__error-message">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="AddEstablishment__group">
                <label
                  className="AddEstablishment__label"
                  htmlFor="AddEstablishment__phone"
                >
                  Address
                </label>
                <input
                  className="AddEstablishment__address AddEstablishment__input"
                  name="address"
                  ref={register}
                  type="text"
                />
                {errors.address && (
                  <span className="AddEstablishment__error-message">
                    {errors.address.message}
                  </span>
                )}
              </div>

              <div className="AddEstablishment__group">
                <label
                  className="AddEstablishment__label"
                  htmlFor="AddEstablishment__input--textbox"
                >
                  Description
                </label>
                <textarea
                  className="AddEstablishment__textbox"
                  name="description"
                  ref={register}
                  type="text"
                  id="AddEstablishment__input--textbox"
                />
                {errors.description && (
                  <span className="AddEstablishment-message">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="AddEstablishment__group">
                <label
                  className="AddEstablishment__label"
                  htmlFor="AddEstablishment__select"
                >
                  Accommodation Type
                </label>
                <select
                  name="category"
                  ref={register}
                  className="AddEstablishment__select"
                  type="text"
                >
                  <option style={{ display: "none" }} value="">
                    Select your type
                  </option>
                  <option value="hotel">Hotel</option>
                  <option value="bed_and_breakfast">Bed and breakfast</option>
                  <option value="guesthouse">Subject Two</option>
                </select>
                {errors.category && (
                  <span className="AddEstablishment__error-message">
                    {errors.category.message}
                  </span>
                )}
              </div>
              <div className="AddEstablishment__group">
                <h3>Add Amenities</h3>
                <p>Add amenities you want to display on your page.</p>

                <div>
                  <h4>Main Amenities</h4>
                  <p>
                    Add at least 3 Main amenities you would like to add to your
                    page. your first entries three will be highlighted at the
                    top of the page
                  </p>
                  <AmenitiesForm
                    addItem={addMainAmenities}
                    placeholderText="Free Wifi, Parking Included, Breakfast included."
                  />
                  <AmenitiesList
                    amenities={mainAmenities}
                    removeItem={removeMainAmenities}
                  />
                </div>
                <div>
                  <h4>For Families</h4>
                  <p>Add at least 3 amenities for families</p>
                  <AmenitiesForm
                    addItem={addFamilyAmenities}
                    placeholderText="Television, Daily housekeeping, Laundry facilities etc."
                  />
                  <AmenitiesList
                    amenities={familyAmenities}
                    removeItem={removeFamilyAmenities}
                  />
                </div>
                <div>
                  <h4>Amenities in the area</h4>
                  <p>Add at least 3 amenities thats in the area</p>
                  <AmenitiesForm
                    addItem={addAreaAmenities}
                    placeholderText="Parks, Shops, Malls, Hiking area etc."
                  />
                  <AmenitiesList
                    amenities={areaAmenities}
                    removeItem={removeAreaAmenities}
                  />
                </div>
              </div>
            </div>

            <div className="AddEstablishment__group">
              <button type="submit" className="AddEstablishment__submit">
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </main>
    </Layout>
  );
}

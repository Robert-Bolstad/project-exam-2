import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../utils/schemaValidators/establishmentDetailsForm";
import Image from "next/image";

const EstablishmentDetails = ({ editData, getDetails, getHotelImage }) => {
  const defaultImage = "/placeholder.jpg";
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(defaultImage);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: 0,
    description: "",
    latitude: "",
    longitude: "",
    featured: false,
  });

  useEffect(() => {
    if (selectedFile) {
      getHotelImage(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage(defaultImage);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (editData) {
      setInputValue({
        ...inputValue,
        name: editData.name,
        email: editData.email,
        phone: editData.phone,
        address: editData.address,
        type: editData.category,
        description: editData.description,
        latitude: editData.geometry.latitude,
        longitude: editData.geometry.longitude,
        featured: editData.featured,
      });
    }
  }, []);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (selectedFile !== null) {
      const checkbox = { featured: inputValue.featured };
      const dataValues = Object.assign(data, checkbox);
      getDetails(dataValues);
      getHotelImage(selectedFile);
      console.log("test");
    }
    if (editData && selectedFile === null) {
      const checkbox = { featured: inputValue.featured };
      const dataValues = Object.assign(data, checkbox);
      getDetails(dataValues);
    }
  };

  const handleCheckbox = () => {
    const toggleCheckbox = document.querySelector(
      ".EstablishmentDetails__featured"
    );
    toggleCheckbox.click();
  };

  function handleInputChange(e) {
    switch (e.target.name) {
      case "name":
        setInputValue({ ...inputValue, name: e.target.value });
        break;
      case "email":
        setInputValue({ ...inputValue, email: e.target.value });
        break;
      case "phone":
        setInputValue({ ...inputValue, phone: e.target.value });
        break;
      case "address":
        setInputValue({ ...inputValue, address: e.target.value });
        break;
      case "category":
        setInputValue({ ...inputValue, type: e.target.value });
        break;
      case "description":
        setInputValue({ ...inputValue, description: e.target.value });
        break;
      case "latitude":
        setInputValue({ ...inputValue, latitude: e.target.value });
        break;
      case "longitude":
        setInputValue({ ...inputValue, longitude: e.target.value });
        break;
      case "featured":
        setInputValue({ ...inputValue, featured: e.target.checked });

        break;
      default:
    }
  }

  return (
    <div className="EstablishmentDetails">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="EstablishmentDetails__form"
      >
        <fieldset className="EstablishmentDetails__fieldset">
          <div className="EstablishmentDetails__preview--image">
            {selectedFile ? (
              <Image
                src={previewImage}
                width="900px"
                height="600px"
                alt="Display image"
              />
            ) : null}
            {editData && selectedFile === null ? (
              <Image
                src={editData.image[0].url}
                width="900px"
                height="600px"
                alt="Display image"
              />
            ) : null}
          </div>
          <div className="EstablishmentDetails__inputs-wrapper">
            <div className="EstablishmentDetails__group EstablishmentDetails__group--image">
              <label
                className="EstablishmentDetails__label"
                htmlFor="EstablishmentDetails__input--image"
              >
                Upload Image
              </label>
              <input
                className="EstablishmentDetails__input EstablishmentDetails__input--image"
                type="file"
                name="image"
                accept="image/*"
                id="EstablishmentDetails__input--name"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              {!editData && selectedFile === null && submitting === true ? (
                <p className="EstablishmentDetails__error-message">
                  <span className="EstablishmentDetails__error-message--asterisks">
                    {"* "}
                  </span>
                  please upload an Image
                </p>
              ) : null}
            </div>
            <div className="EstablishmentDetails__group EstablishmentDetails__group--name">
              <label
                className="EstablishmentDetails__label"
                htmlFor="EstablishmentDetails__input--name"
              >
                Accomodation name
              </label>
              <input
                ref={register}
                className="EstablishmentDetails__input EstablishmentDetails__input--name"
                type="text"
                name="name"
                id="EstablishmentDetails__input--name"
                value={inputValue.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <p className="EstablishmentDetails__error-message">
                  <span className="EstablishmentDetails__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="EstablishmentDetails__group">
              <label
                className="EstablishmentDetails__label"
                htmlFor="EstablishmentDetails__email"
              >
                Email
              </label>
              <input
                className="EstablishmentDetails__email EstablishmentDetails__input"
                name="email"
                ref={register}
                type="text"
                value={inputValue.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="EstablishmentDetails__error-message">
                  <span className="EstablishmentDetails__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="EstablishmentDetails__group">
              <label
                className="EstablishmentDetails__label"
                htmlFor="EstablishmentDetails__phone"
              >
                Phone
              </label>
              <input
                className="EstablishmentDetails__phone EstablishmentDetails__input"
                name="phone"
                ref={register}
                type="text"
                value={inputValue.phone}
                onChange={handleInputChange}
              />
              {errors.phone && (
                <p className="EstablishmentDetails__error-message">
                  <span className="EstablishmentDetails__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="EstablishmentDetails__group">
              <label
                className="EstablishmentDetails__label"
                htmlFor="EstablishmentDetails__phone"
              >
                Address
              </label>
              <input
                className="EstablishmentDetails__address EstablishmentDetails__input"
                name="address"
                ref={register}
                type="text"
                value={inputValue.address}
                onChange={handleInputChange}
              />
              {errors.address && (
                <p className="EstablishmentDetails__error-message">
                  <span className="EstablishmentDetails__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className="EstablishmentDetails__group">
              <label
                className="EstablishmentDetails__label"
                htmlFor="EstablishmentDetails__select"
              >
                Accommodation Type
              </label>
              <select
                name="category"
                ref={register}
                className="EstablishmentDetails__select"
                type="text"
                value={inputValue.type}
                onChange={handleInputChange}
              >
                <option
                  className="EstablishmentDetails__option"
                  style={{ display: "none" }}
                  value=""
                >
                  Select your type
                </option>
                <option className="EstablishmentDetails__option" value="hotel">
                  Hotel
                </option>
                <option
                  className="EstablishmentDetails__option"
                  value="bed_and_breakfast"
                >
                  Bed and breakfast
                </option>
                <option
                  className="EstablishmentDetails__option"
                  value="guesthouse"
                >
                  guesthouse
                </option>
              </select>
              {errors.category && (
                <p className="EstablishmentDetails__error-message">
                  <span className="EstablishmentDetails__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="EstablishmentDetails__textbox-wrapper">
            <div className="EstablishmentDetails__group EstablishmentDetails__group--textbox">
              <label
                className="EstablishmentDetails__label"
                htmlFor="EstablishmentDetails__input--textbox"
              >
                Description
              </label>
              <textarea
                className="EstablishmentDetails__textbox"
                name="description"
                ref={register}
                type="text"
                value={inputValue.description}
                onChange={handleInputChange}
              />
              {errors.description && (
                <p className="EstablishmentDetails_error-message">
                  <span className="EstablishmentDetails__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <div className="EstablishmentDetails__geometry-wrapper">
            <h2 className="EstablishmentDetails__heading">
              Establishment Location
            </h2>
            <p className="EstablishmentDetails__description">
              Add the coordinates of your establishment. Use
              <a
                className="EstablishmentDetails__link"
                href="https://www.latlong.net"
                target="_blank"
              >
                {" "}
                this website{" "}
              </a>
              to get the latitude and longitude
            </p>
            <div className="EstablishmentDetails__group EstablishmentDetails__group--geometry">
              <label
                className="EstablishmentDetails__label"
                htmlFor="EstablishmentDetails__geometry"
              >
                Latitude
              </label>
              <input
                className="EstablishmentDetails__latitude EstablishmentDetails__input"
                name="latitude"
                ref={register}
                type="string"
                value={inputValue.latitude}
                onChange={handleInputChange}
              />
              {errors.latitude && (
                <p className="EstablishmentDetails_error-message">
                  <span className="EstablishmentDetails__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.latitude.message}
                </p>
              )}
            </div>
            <div className="EstablishmentDetails__group EstablishmentDetails__group--geometry">
              <label
                className="EstablishmentDetails__label"
                htmlFor="EstablishmentDetails__geometry"
              >
                Longitude
              </label>
              <input
                className="EstablishmentDetails__longitude EstablishmentDetails__input"
                name="longitude"
                ref={register}
                type="string"
                value={inputValue.longitude}
                onChange={handleInputChange}
              />
              {errors.longitude && (
                <p className="EstablishmentDetails_error-message">
                  <span className="EstablishmentDetails__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.longitude.message}
                </p>
              )}
            </div>
          </div>

          <div className="EstablishmentDetails__featured-wrapper">
            <h2 className="EstablishmentDetails__heading">
              Feature on Homepage
            </h2>
            <p className="EstablishmentDetails__description">
              If you wish to feature this establishment on the homepage, toggle
              the checkbox below.
            </p>
            <div className="EstablishmentDetails__group EstablishmentDetails__group--featured">
              <div>
                <input
                  className="EstablishmentDetails__featured"
                  name="featured"
                  ref={register}
                  type="checkbox"
                  checked={inputValue.featured}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={handleCheckbox}
                  style={
                    inputValue.featured === true
                      ? { backgroundColor: "#3d5e78" }
                      : { backgroundColor: "#ffffff" }
                  }
                  className="EstablishmentDetails__featured--btn"
                >
                  <img
                    className="EstablishmentDetails__featured--icon"
                    src="./../checkbox.svg"
                    alt="check icon"
                  />
                </button>
              </div>
              <label
                className="EstablishmentDetails__label EstablishmentDetails__label--featured"
                htmlFor="EstablishmentDetails__phone"
              >
                Featured on homepage?
              </label>
            </div>
          </div>

          <div className="EstablishmentDetails__btn-wrapper">
            <button
              type="submit"
              className="EstablishmentDetails__submit"
              onClick={() => setSubmitting(true)}
            ></button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default EstablishmentDetails;

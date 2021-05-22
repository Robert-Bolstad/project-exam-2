import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../utils/schemaValidators/addRoomsValidators";

function RoomsForm({ addRoom, submitting }) {
  const [room, setRoom] = useState();

  const onSubmit = (data) => {
    setRoom({
      ...room,
      id: Math.random(),
      name: data.name,
      price: data.price,
      description: data.description,
      max_guests: data.max_guests,
      size_m2: data.size_m2,
      bedrooms: data.bedrooms,
      quantity: data.quantity,
    });
    addRoom({
      ...room,
      id: Math.random(),
      name: data.name,
      price: data.price,
      description: data.description,
      max_guests: data.max_guests,
      size_m2: data.size_m2,
      bedrooms: data.bedrooms,
      quantity: data.quantity,
    });

    console.log(room);
  };

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    // <div>
    //   <input
    //     name="task"
    //     type="text"
    //     value={room.room}
    //     onChange={handleTaskInputChange}
    //   />
    //   <button onClick={(e) => handleClick(e)}>add</button>
    // </div>
    <form onSubmit={handleSubmit(onSubmit)} className="AddRooms__form">
      <fieldset className="AddRooms__fieldset">
        <div className="AddRooms__wrapper">
          <div className="AddRooms__inputs-wrapper">
            <div className="AddRooms__group">
              <label
                className="AddRooms__label"
                htmlFor="AddRooms__input--name"
              >
                Room name
              </label>
              <input
                ref={register}
                className="AddRooms__input AddRooms__input--name"
                type="text"
                name="name"
                id="AddRooms__input--name"
              />
              {errors.name && (
                <p className="AddRooms__error-message">
                  <span className="AddRooms__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="AddRooms__group">
              <label className="AddRooms__label" htmlFor="AddRooms__price">
                Price
              </label>
              <input
                className="AddRooms__price AddRooms__input"
                name="price"
                ref={register}
                type="number"
              />
              {errors.price && (
                <p className="AddRooms__error-message">
                  <span className="AddRooms__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="AddRooms__group">
              <label className="AddRooms__label" htmlFor="AddRooms__max_guests">
                Max Guests
              </label>
              <input
                className="AddRooms__max_guests AddRooms__input"
                name="max_guests"
                ref={register}
                type="number"
              />
              {errors.max_guests && (
                <p className="AddRooms__error-message">
                  <span className="AddRooms__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.max_guests.message}
                </p>
              )}
            </div>

            <div className="AddRooms__group">
              <label className="AddRooms__label" htmlFor="AddRooms__size_m2">
                Room Size m2
              </label>
              <input
                className="AddRooms__size_m2 AddRooms__input"
                name="size_m2"
                ref={register}
                type="number"
              />
              {errors.size_m2 && (
                <p className="AddRooms__error-message">
                  <span className="AddRooms__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.size_m2.message}
                </p>
              )}
            </div>

            <div className="AddRooms__group">
              <label className="AddRooms__label" htmlFor="AddRooms__bedrooms">
                Nr of Bedrooms
              </label>
              <input
                className="AddRooms__bedrooms AddRooms__input"
                name="bedrooms"
                ref={register}
                type="number"
              />
              {errors.bedrooms && (
                <p className="AddRooms__error-message">
                  <span className="AddRooms__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.bedrooms.message}
                </p>
              )}
            </div>

            <div className="AddRooms__group">
              <label className="AddRooms__label" htmlFor="AddRooms__quantity">
                Quantity of this room
              </label>
              <input
                className="AddRooms__quantity AddRooms__input"
                name="quantity"
                ref={register}
                type="number"
              />
              {errors.quantity && (
                <p className="AddRooms__error-message">
                  <span className="AddRooms__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="AddRooms__group--textbox">
              <label className="AddRooms__label" htmlFor="AddRooms__textbox">
                Description
              </label>
              <textarea
                className="AddRooms__textbox"
                name="description"
                ref={register}
                type="text"
              />
              {errors.description && (
                <p className="AddRooms__error-message">
                  <span className="AddRooms__error-message--asterisks">
                    {"* "}
                  </span>
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          onClick={() => {
            submitting(true);
          }}
          className="AddRooms__submit"
        >
          Add Room
        </button>
      </fieldset>
    </form>
  );
}

export default RoomsForm;

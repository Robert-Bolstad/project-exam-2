const Enquiries = ({ data }) => {
  function openEnquiry(element, id) {
    const enquiry = element.parentElement.querySelector(".Enquiries__enquiry");
    const btnImg = element.querySelector(".Enquiries__btn-img");
    enquiry.classList.toggle("Enquiries__enquiry--open");
    btnImg.classList.toggle("Enquiries__btn-img--open");
  }

  return (
    <div className="Enquiries">
      <h1 className="Enquiries__heading">Lastest Enquiries</h1>
      {data.map((data) => {
        return (
          <div key={data.id} className="Enquiries__wrapper">
            <button
              className="Enquiries__btn"
              onClick={(event) => openEnquiry(event.currentTarget, data.id)}
            >
              <span className="Enquiries__btn-text">
                {"From: " + data.firstName + " " + data.lastName}
              </span>

              <img
                src="/arrow.svg"
                alt="arrow-icon"
                className="Enquiries__btn-img"
              />
            </button>
            <div className="Enquiries__enquiry">
              <div className="Enquiries__id">
                <p className="Enquiries__id-info">
                  Id:
                  <span className="Enquiries__id-detail">{" " + data.id}</span>
                </p>
              </div>
              <div className="Enquiries__contact">
                <h3 className="Enquiries__contact-heading">Contact Info</h3>
                <p className="Enquiries__contact-info">
                  First name:
                  <span className="Enquiries__contact-detail">
                    {" " + data.firstName}
                  </span>
                </p>
                <p className="Enquiries__contact-info">
                  Last Name:
                  <span className="Enquiries__contact-detail">
                    {" " + data.lastName}
                  </span>
                </p>
                <p className="Enquiries__contact-info">
                  Email:
                  <span className="Enquiries__contact-detail">
                    {" " + data.email}
                  </span>
                </p>
                <p className="Enquiries__contact-info">
                  Phone:{" "}
                  <span className="Enquiries__contact-detail">
                    {" " + data.phone}
                  </span>
                </p>
              </div>
              <div className="Enquiries__booking">
                <h3 className="Enquiries__booking-heading">Booking details</h3>
                <p className="Enquiries__booking-info">
                  Accommodation:
                  <span className="Enquiries__booking-detail">
                    {" " + data.hotel}
                  </span>
                </p>
                <p className="Enquiries__booking-info">
                  Check in:
                  <span className="Enquiries__booking-detail">
                    {" " + data.checkIn}
                  </span>
                </p>
                <p className="Enquiries__booking-info">
                  Check out:
                  <span className="Enquiries__booking-detail">
                    {" " + data.checkOut}
                  </span>
                </p>
                <p className="Enquiries__booking-info">
                  Guests:
                  <span className="Enquiries__booking-detail">
                    {" " + data.guests}
                  </span>
                </p>
                <p className="Enquiries__booking-info Enquiries__booking-info--rooms">
                  Rooms:
                </p>
                <ul className="Enquiries__booking-rooms">
                  {data.rooms.map((room) => {
                    return (
                      <li
                        key={Math.random()}
                        className="Enquiries__booking-room"
                      >
                        {" " +
                          room.name +
                          " " +
                          room.price +
                          "$ " +
                          "x " +
                          room.quantity}
                      </li>
                    );
                  })}
                </ul>
                <p className="Enquiries__booking-subtotal">
                  Subtotal:
                  <span className="Enquiries__booking-detail">
                    {" " + data.subtotal + "$"}
                  </span>
                </p>
              </div>
              {data.message.length > 0 ? (
                <div className="Enquiries__message">
                  <h3 className="Enquiries__message-heading">Message</h3>
                  <p className="Enquiries__message-content">{data.message}</p>
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Enquiries;

import Link from "next/link";
import doDelete from "../../utils/doDelete";
const Establishments = ({ data }) => {
  function openEnquiry(element) {
    const establishment = element.parentElement.querySelector(
      ".Establishments__establishment"
    );
    const btnImg = element.querySelector(".Establishments__btn-img");
    establishment.classList.toggle("Establishments__establishment--open");
    btnImg.classList.toggle("Establishments__btn-img--open");
  }

  return (
    <div className="Establishments">
      <div className="Establishments__top">
        <h1 className="Establishments__heading">Establishments</h1>

        <Link href="/addestablishment">
          <a className="Establishments__link">+ Add New</a>
        </Link>
      </div>

      {data.map((data) => {
        return (
          <div key={data.id} className="Establishments__wrapper">
            <button
              className="Establishments__btn"
              onClick={(event) => openEnquiry(event.currentTarget, data.id)}
            >
              <span className="Establishments__btn-text">{data.name}</span>

              <img
                src="/arrow.svg"
                alt="arrow-icon"
                className="Establishments__btn-img"
              />
            </button>
            <div className="Establishments__establishment">
              <div className="Establishments__general">
                <p className="Establishments__info">
                  Name:
                  <span className="Establishments__info-detail">
                    {" " + data.name}
                  </span>
                </p>
                <p className="Establishments__info">
                  Type:
                  <span className="Establishments__info-detail">
                    {" " + data.category}
                  </span>
                </p>
              </div>
              <div className="Establishments__contact">
                <h3 className="Establishments__contact-heading">
                  Contact Info
                </h3>
                <p className="Establishments__info">
                  Address:
                  <span className="Establishments__info-detail">
                    {" " + data.address}
                  </span>
                </p>
                <p className="Establishments__info">
                  Email:
                  <span className="Establishments__info-detail">
                    {" " + data.email}
                  </span>
                </p>
                <p className="Establishments__info">
                  Phone:
                  <span className="Establishments__info-detail">
                    {" " + data.phone}
                  </span>
                </p>
              </div>
              <div className="Establishments__rooms">
                <h3 className="Establishments__rooms-heading">Rooms</h3>
                <ul className="Establishments__booking-rooms">
                  {data.rooms.map((room) => {
                    return (
                      <li
                        key={Math.random()}
                        className="Establishments__booking-room"
                      >
                        {room.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <Link href={"/edit/" + data.id}>
                <a className="Establishments__link">Edit</a>
              </Link>
              <button
                className="Establishments__delete-btn"
                type="button"
                onClick={() => {
                  doDelete(data);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Establishments;

import Image from "next/image";
import { BASE_URL } from "../settings/api";
const RoomFinder = ({ data }) => {
  return (
    <section className="room-finder">
      <h3 className="room-finder__heading">Find Available Rooms</h3>
      <div className="room-finder__wrapper">
        <form className="room-finder__form">
          <div className="room-finder__group-wrapper">
            <div className="room-finder__group">
              <div className="room-finder__group-inner">
                <Image
                  className="room-finder__icon"
                  src="/check-inn.svg"
                  width="33"
                  height="33"
                  alt="logo"
                />
                <div className="room-finder__input-btn">
                  <div className="room-finder__input-btn-text--top">Monday</div>
                  <div className="room-finder__input-btn-text--bottom">
                    1 March
                  </div>
                </div>
              </div>
            </div>
            <div className="room-finder__group">
              <div className="room-finder__group-inner">
                <Image
                  className="room-finder__icon"
                  src="/check-out.svg"
                  width="33"
                  height="33"
                  alt="logo"
                />
                <div className="room-finder__input-btn">
                  <div className="room-finder__input-btn-text--top">Friday</div>
                  <div className="room-finder__input-btn-text--bottom">
                    7 March
                  </div>
                </div>
              </div>
            </div>
            <div className="room-finder__group">
              <div className="room-finder__group-inner">
                <Image
                  className="room-finder__icon"
                  src="/user.svg"
                  width="33"
                  height="33"
                  alt="logo"
                />
                <div className="room-finder__input-btn">
                  <div className="room-finder__input-btn-text--top">Guests</div>
                  <div className="room-finder__input-btn-text--bottom">1</div>
                </div>
              </div>
            </div>
            <button className="room-finder__submit">
              <Image
                className="room-finder__icon"
                src="/search.svg"
                width="33"
                height="33"
                alt="logo"
              />
              Find Rooms
            </button>
          </div>
        </form>
        <p className="room-finder__result-text">
          Available Rooms from you search
        </p>
        <div>
          {data.rooms.map((room) => {
            return (
              <div>
                <div>
                  <Image
                    className="room-finder__icon"
                    src={BASE_URL + room.url}
                    width="100"
                    height="70"
                    alt="logo"
                  />
                </div>
                <h4>{room.name}</h4>
                <p>{room.description}</p>
                <div>
                  <i>
                    <Image
                      className="room-finder__icon"
                      src="/user.svg"
                      width="15"
                      height="15"
                      alt="logo"
                    />
                  </i>
                  {room.max_guests + " guest"}
                </div>
                <div>{room.size_m2 + " m2"}</div>
                <div>{room.bedrooms + " bedroom"}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoomFinder;

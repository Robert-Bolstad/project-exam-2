import Image from "next/image";
import { BASE_URL } from "../settings/api";
const Card = ({ hotel }) => {
  return (
    <div className="card">
      <div className="card__img">
        <Image
          src={BASE_URL + hotel.image.url}
          width="100%"
          height="250px"
          alt="hotel image"
        />
      </div>

      <div className="card__info">
        <h4 className="card__heading">{hotel.name}</h4>
        <p className="card__description">{hotel.description}</p>
      </div>
    </div>
  );
};

export default Card;

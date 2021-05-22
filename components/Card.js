import Image from "next/image";
import { BASE_URL } from "../settings/api";
import Link from "next/link";
const Card = ({ hotel }) => {
  const link = "/detail/" + hotel.id;
  return (
    <div className="card">
      <div className="card__img">
        <Image
          src={BASE_URL + hotel.image[0].url}
          width={hotel.image[0].width}
          height={hotel.image[0].height}
          alt="hotel image"
        />
      </div>

      <div className="card__info">
        <Link href={link}>
          <a className="card__link">{hotel.name}</a>
        </Link>
        <p className="card__description">
          {hotel.description.slice(0, 200) + " ..."}
        </p>
      </div>
    </div>
  );
};

export default Card;

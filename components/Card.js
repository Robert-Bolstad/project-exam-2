import Image from "next/image";
const Card = () => {
  return (
    <div className="card">
      <Image
        className="card__img"
        src="/placeholder.jpg"
        width="auto"
        height="300px"
        alt="hotel image"
      />
      <div className="card__info">
        <h4 className="card__heading">Place name</h4>
        <p className="card__description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut
          accusamus sunt reiciendis deserunt. Dignissimos qui earum animi aut
          dolor at!
        </p>
      </div>
    </div>
  );
};

export default Card;

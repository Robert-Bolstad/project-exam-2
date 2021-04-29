const Newsletter = () => {
  return (
    <section className="newsletter">
      <h3 className="newsletter__heading">Subscribe to our Newsletter</h3>
      <p className="newsletter__description">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe ullam
        voluptatum odio asperiores eius, inventore distinctio dolorem rem nisi
        placeat itaque delectus. Culpa, eius. Atque hic facere at possimus rerum
        molestiae a ad dolore recusandae enim velit magnam quam officia fugiat,
        consequuntur voluptates molestias? Nisi explicabo repellat fugit quidem
        natus.
      </p>
      <div className="newsletter__subscription">
        <button className="newsletter__btn">Sign up</button>
        <input
          className="newsletter__input"
          type="text"
          placeholder="Enter your email"
        />
      </div>
    </section>
  );
};

export default Newsletter;

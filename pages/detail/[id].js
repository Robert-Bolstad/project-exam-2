import axios from "axios";
import { BASE_URL } from "../../settings/api";
import Head from "../../components/layout/Head";
import Layout from "../../components/layout/Layout";
import Image from "next/image";
import ContactMap from "../../components/ContactMap";
import RoomFinder from "../../components/RoomFinder";
import Footer from "../../components/Footer";

export default function Establishment({ establishment }) {
  return (
    <Layout>
      <Head title={establishment.name} />
      <main>
        <section className="establishment">
          <div className="establishment__intro">
            <h1 className="establishment__heading">
              {establishment.name}
              <span className="establishment__heading--rating">
                {" " + establishment.rating + "-star"}
              </span>
            </h1>
            <p className="establishment__description">
              {establishment.description}
            </p>
          </div>
          <div className="establishment__image">
            <Image
              src={BASE_URL + establishment.image.url}
              width="1000px"
              height="667px"
              alt="image of establishment"
            />
          </div>

          <ul className="establishment__list establishment__list--desktop">
            <li className="establishment__item establishment__item--desktop">
              <Image
                src="/check.svg"
                width="15px"
                height="15x"
                alt="check icon"
              />
              <p className="establishment__list-info">
                {establishment.accommodation_highlights.highlights[0]}
              </p>
            </li>
            <li className="establishment__item establishment__item--desktop">
              <Image
                src="/check.svg"
                width="15px"
                height="15x"
                alt="check icon"
              />
              <p className="establishment__list-info">
                {establishment.accommodation_highlights.highlights[1]}
              </p>
            </li>
            <li className="establishment__item establishment__item--desktop">
              <Image
                src="/check.svg"
                width="15px"
                height="15x"
                alt="check icon"
              />
              <p className="establishment__list-info">
                {establishment.accommodation_highlights.highlights[2]}
              </p>
            </li>
          </ul>

          <div className="establishment__price-wrapper">
            <div className="establishment__price-text">From</div>
            <div className="establishment__price">${establishment.price}</div>
            <div className="establishment__price-text">per night</div>
          </div>
          <button className="establishment__btn">Find Room</button>
          <div className="establishment__contact">
            <ContactMap
              map="establishment__map"
              marker="establishment__map-marker"
              lat={establishment.geometry.latitude}
              long={establishment.geometry.longitude}
            />
            <ul className="establishment__list">
              <li className="establishment__item">
                <Image
                  src="/phone.svg"
                  width="15px"
                  height="15x"
                  alt="phone icon"
                />

                <p className="establishment__list-info">
                  {establishment.contact.phone}
                </p>
              </li>
              <li className="establishment__item">
                <Image
                  src="/mail.svg"
                  width="15px"
                  height="15x"
                  alt="mail icon"
                />

                <p className="establishment__list-info">
                  {establishment.contact.email}
                </p>
              </li>
              <li className="establishment__item">
                <Image
                  src="/location.svg"
                  width="15px"
                  height="15x"
                  alt="location icon"
                />

                <p className="establishment__list-info">
                  {establishment.contact.adress}
                </p>
              </li>
            </ul>
          </div>
        </section>
        <section className="amenities">
          <h2 className="amenities__heading">Property highlights</h2>
          <div className="amenities__wrapper">
            <div className="amenities__category">
              <h4 className="amenities__subheading">Main amenitites</h4>
              <ul className="amenities__list">
                {establishment.amenities.main.map((main) => {
                  return (
                    <li className="amenities__item" key={Math.random()}>
                      {main}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="amenities__category">
              <h4 className="amenities__subheading">For families</h4>
              <ul className="amenities__list">
                {establishment.amenities.families.map((families) => {
                  return (
                    <li className="amenities__item" key={Math.random()}>
                      {families}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="amenities__category">
              <h4 className="amenities__subheading">What's around</h4>
              <ul className="amenities__list">
                {establishment.amenities.area.map((area) => {
                  return (
                    <li className="amenities__item" key={Math.random()}>
                      {area}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
        <RoomFinder data={establishment} />
      </main>
      <Footer />
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(BASE_URL + "/establishments");
    const establishments = response.data;

    console.log(establishments);

    const paths = establishments.map((establishment) => ({
      params: { id: establishment.id.toString() },
    }));

    return { paths: paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const url = `${BASE_URL + "/establishments"}/${params.id}`;

  let establishment = null;

  try {
    const response = await axios.get(url);
    establishment = response.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { establishment: establishment },
  };
}

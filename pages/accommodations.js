import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import { BASE_URL } from "../settings/api";
import axios from "axios";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import ResultMap from "../components/ResultMap";
import FilterList from "../components/FilterList";
import { useEffect, useState } from "react";

export default function Accommodations({ results }) {
  const [listResults, setListResults] = useState(results);

  useEffect(() => {}, [listResults]);

  const filterResults = (data) => {
    if (data.price !== "" && data.accommodations !== "all") {
      const filteredResults = results.filter(
        (result) =>
          result.price <= data.price && result.category === data.accommodations
      );
      setListResults(filteredResults);
    }
    if (data.price !== "" && data.accommodations === "all") {
      const filteredResults = results.filter(
        (result) => result.price <= data.price
      );
      setListResults(filteredResults);
    }
    if (data.price == "" && data.accommodations !== "all") {
      const filteredResults = results.filter(
        (result) => result.category === data.accommodations
      );
      setListResults(filteredResults);
    }
    if (data.price == "" && data.accommodations === "all") {
      setListResults(results);
    }
  };

  function toggleMap() {
    const map = document.querySelector(".map");
    const overlay = document.querySelector(".map__overlay");
    overlay.classList.toggle("map__overlay--active");
    map.classList.toggle("map--open");
  }

  return (
    <Layout>
      <Head title="Accommodations" />
      <main className="accommodations">
        <section className="accommodations__section accommodations__section--one">
          <h1 className="accommodations__heading">Accomodations in bergen</h1>
          <FilterList filterResults={filterResults} />
        </section>
        <section className="accommodations__section accommodations__section--two">
          <div className="accommodations__result-info">
            <h3 className="accommodations__results-heading">
              Your Results(
              <span className="accommodations__results-number">
                {listResults.length}
              </span>
              )
            </h3>
            <button onClick={toggleMap} className="accommodations__open-map">
              <Image
                src="/location.svg"
                width="20"
                height="20"
                alt="hotel icon"
              />
              Open Map
            </button>
          </div>
          <div className="accommodations__result">
            <div className="accommodations__card-wrapper">
              {listResults.map((card) => {
                return (
                  <div className="accommodation-card" key={card.id}>
                    <div className="accommodation-card__img">
                      <Image
                        src={card.image[0].url}
                        width="auto"
                        height="auto"
                        alt="image of establishment"
                      />
                    </div>
                    <div className="accommodation-card__inner">
                      <div className="accommodation-card__info">
                        <h4 className="accommodation-card__name">
                          {card.name}
                        </h4>
                        <p className="accommodation-card__description">
                          {card.description.slice(0, 100)}
                        </p>
                        <div className="accommodation-card__link-btn">
                          <Link href={`/detail/${card.id}`}>
                            <a className="accommodation-card__link">
                              Visit page
                            </a>
                          </Link>
                        </div>
                      </div>
                      <div className="accommodation-card__price-wrapper">
                        <div className="accommodation-card__price-text accommodation-card__price-text--highlight">
                          From
                        </div>
                        <div className="accommodation-card__price">
                          ${card.price}
                        </div>
                        <div className="accommodation-card__price-text">
                          per night
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <ResultMap props={listResults} />
            <div className="map__overlay">
              <button className="map__close" onClick={toggleMap}>
                &times;
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Layout>
  );
}

export async function getStaticProps() {
  let results = [];

  try {
    const response = await axios.get(BASE_URL + "/establishments");

    results = response.data;
    console.log(results);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      results: results,
    },
  };
}

import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import { BASE_URL } from "../settings/api";
import axios from "axios";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import ResultMap from "../components/ResultMap";

export default function Accommodations(props) {
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
          <form className="filter-list">
            <div className="filter-list__wrapper">
              <div className="filter-list__group">
                <label className="filter-list__label" htmlFor="">
                  Max Price
                </label>
                <input
                  className="filter-list__input"
                  placeholder="0$"
                  type="number"
                />
              </div>
            </div>

            <div className="filter-list__wrapper">
              <div className="filter-list__group">
                <label
                  className="filter-list__label"
                  htmlFor="filter-list__type"
                >
                  Accommodation
                </label>
                <select className="filter-list__type" name="type" type="text">
                  <option className="filter-list__option" value="all">
                    All
                  </option>
                  <option className="filter-list__option" value="hotel">
                    Hotels
                  </option>
                  <option className="filter-list__option" value="bb">
                    B&#38;Bs
                  </option>
                  <option className="filter-list__option" value="guesthouse">
                    Guesthouses
                  </option>
                </select>
              </div>
            </div>

            <button className="filter-list__search">
              <Image
                src="/search.svg"
                width="33"
                height="33"
                alt="hotel icon"
              />
              Search
            </button>
          </form>
        </section>
        <section className="accommodations__section accommodations__section--two">
          <div className="accommodations__result-info">
            <h3 className="accommodations__results-heading">
              Your Results(
              <span className="accommodations__results-number">
                {props.results.length}
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
            {props.results.map((card) => {
              return (
                <div className="accommodation-card" key={card.id}>
                  <div className="accommodation-card__img">
                    <Image
                      src={BASE_URL + card.image.url}
                      width="auto"
                      height="180px"
                      alt="image of establishment"
                    />
                  </div>
                  <div className="accommodation-card__inner">
                    <div>
                      <h4 className="accommodation-card__name">{card.name}</h4>
                      <p className="accommodation-card__description">
                        {card.description}
                      </p>
                      <div className="accommodation-card__link-btn">
                        <Link href={`/detail/${card.id}`}>
                          <a className="accommodation-card__link">Visit page</a>
                        </Link>
                      </div>
                    </div>
                    <div className="accommodation-card__price-wrapper">
                      <div className="accommodation-card__price-text">From</div>
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
            <ResultMap props={props} />
            <div className="map__overlay">
              <button className="map__close" onClick={toggleMap}>
                &times;
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
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

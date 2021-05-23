import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import Image from "next/image";
import Card from "../components/Card";
import Footer from "../components/Footer";
import SearchBox from "../components/SearchBox";
import { BASE_URL } from "../settings/api";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home({ results }) {
  const router = useRouter();

  const featuredHotels = () => {
    const hotels = results.filter((hotel) => hotel.category === "hotel");
    const featured = hotels.filter((featured) => featured.featured === true);
    return featured;
  };
  const featuredBB = () => {
    const BB = results.filter(
      (hotel) => hotel.category === "bed_and_breakfast"
    );
    const featured = BB.filter((featured) => featured.featured === true);
    return featured;
  };
  const featuredGuestHouses = () => {
    const houses = results.filter((hotel) => hotel.category === "guesthouse");
    const featured = houses.filter((featured) => featured.featured === true);
    return featured;
  };
  const getLength = (type) => {
    const filter = results.filter((hotel) => hotel.category === type);
    return filter.length;
  };
  const pageFilter = (filter) => {
    localStorage.setItem("filter-accommodations", JSON.stringify(filter));
    router.push("/accommodations");
  };

  return (
    <Layout>
      <Head title="Home" />
      <main>
        <section className="searchbox">
          <div className="searchbox__box">
            <div className="searchbox__info-top">
              <h1 className="searchbox__heading">
                Search Accommodations in Bergen
              </h1>
              <p className="searchbox__subheadline">
                Find hotels, B&#38;B and guesthouses in Bergen
              </p>
            </div>
            <SearchBox data={results} />
          </div>
        </section>
        <section className="featured">
          <h2 className="featured__heading">Popular Accommodations</h2>

          <div className="featured__hotels">
            <div className="featured__category">
              <Image src="/hotel.svg" width="33" height="33" alt="hotel icon" />
              <h3 className="featured__subheading">Hotels</h3>
            </div>
            <div className="featured__cards">
              {featuredHotels().map((hotel) => {
                return <Card key={hotel.id} hotel={hotel} />;
              })}
            </div>
            <div className="featured__link-wrapper">
              <button
                type="button"
                onClick={() => pageFilter("hotel")}
                className="featured__link"
              >
                View all (
                <span className="featured__link--number">
                  {getLength("hotel")}
                </span>
                )
              </button>
            </div>
          </div>

          <div className="featured__b-bs">
            <div className="featured__category">
              <Image src="/bb.svg" width="33" height="33" alt="hotel icon" />
              <h3 className="featured__subheading">Bed &amp; Breakfast</h3>
            </div>
            <div className="featured__cards">
              {featuredBB().map((hotel) => {
                return <Card key={hotel.id} hotel={hotel} />;
              })}
            </div>
            <div className="featured__link-wrapper">
              <button
                type="button"
                onClick={() => pageFilter("bed_and_breakfast")}
                className="featured__link"
              >
                View all (
                <span className="featured__link--number">
                  {getLength("hotel")}
                </span>
                )
              </button>
            </div>
          </div>

          <div className="featured__guesthouses">
            <div className="featured__category">
              <Image
                src="/house2.svg"
                width="33"
                height="33"
                alt="hotel icon"
              />
              <h3 className="featured__subheading">Guest Houses</h3>
            </div>
            <div className="featured__cards">
              {featuredGuestHouses().map((hotel) => {
                return <Card key={hotel.id} hotel={hotel} />;
              })}
            </div>
            <div className="featured__link-wrapper">
              <button
                type="button"
                onClick={() => pageFilter("guesthouse")}
                className="featured__link"
              >
                View all (
                <span className="featured__link--number">
                  {getLength("hotel")}
                </span>
                )
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
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      results: results,
    },
  };
}

import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import Image from "next/image";
import Card from "../components/Card";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import SearchBox from "../components/SearchBox";
import { BASE_URL } from "../settings/api";
import axios from "axios";

export default function Home({ results }) {
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

  return (
    <Layout>
      <Head title="Home" />
      <main>
        <SearchBox data={results} />
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
            <Link href="/">
              <a className="featured__link">
                See all(
                <span className="featured__link--number">
                  {featuredHotels().length}
                </span>
                )
              </a>
            </Link>
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
            <Link href="/">
              <a className="featured__link">
                See all(
                <span className="featured__link--number">
                  {featuredBB().length}
                </span>
                )
              </a>
            </Link>
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
            <Link href="/">
              <a className="featured__link">
                See all(
                <span className="featured__link--number">
                  {featuredGuestHouses().length}
                </span>
                )
              </a>
            </Link>
          </div>
        </section>
        <Newsletter />
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

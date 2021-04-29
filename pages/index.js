import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import Image from "next/image";
import Card from "../components/Card";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import SearchBox from "../components/SearchBox";

export default function Home() {
  return (
    <Layout>
      <Head title="Home" />
      <main>
        <SearchBox />
        <section className="featured">
          <h2 className="featured__heading">Popular Accommodations</h2>

          <div className="featured__hotels">
            <div className="featured__category">
              <Image src="/hotel.svg" width="33" height="33" alt="hotel icon" />
              <h3 className="featured__subheading">Hotels</h3>
            </div>
            <div className="featured__cards">
              <Card />
              <Card />
              <Card />
            </div>
            <Link href="/">
              <a className="featured__link">
                See all(<span className="featured__link--number">10</span>)
              </a>
            </Link>
          </div>

          <div className="featured__b-bs">
            <div className="featured__category">
              <Image src="/bb.svg" width="33" height="33" alt="hotel icon" />
              <h3 className="featured__subheading">Bed &amp; Breakfast</h3>
            </div>
            <div className="featured__cards">
              <Card />
              <Card />
              <Card />
            </div>
            <Link href="/">
              <a className="featured__link">
                See all(<span className="featured__link--number">10</span>)
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
              <Card />
              <Card />
              <Card />
            </div>
            <Link href="/">
              <a className="featured__link">
                See all(<span className="featured__link--number">10</span>)
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

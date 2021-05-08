import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import BookingForm from "../components/BookingForm";
import Link from "next/link";
import EnquiryContext from "../context/EnquiryContext";
import BookingInfo from "../components/BookingInfo";

const enquiry = () => {
  const [data] = useContext(EnquiryContext);

  useEffect(() => {}, []);
  return (
    <Layout>
      <Head title="Enquiry" />
      <main className="enquiry">
        <section className="enquiry__hotel-info">
          <h1 className="enquiry__heading">Book Now</h1>
          <Link href="/">
            <a className="enquiry__link">Go Back</a>
          </Link>
          {data ? <BookingInfo data={data} /> : null}
        </section>
        <section className="enquiry__contact-info">
          <BookingForm />
        </section>
      </main>
      <Footer />
    </Layout>
  );
};

export default enquiry;

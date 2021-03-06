import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import BookingForm from "../components/BookingForm";
import Link from "next/link";
import BookingInfo from "../components/BookingInfo";
import { useRouter } from "next/router";
import {
  calculateDays,
  calculateRoomPrice,
  calculateSubtotal,
} from "../utils/calculation";

const enquiry = () => {
  const [data, setData] = useState();
  const [returnLink, setReturnLink] = useState("/detail");
  const router = useRouter();

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("booked-data"));
    if (storageData) {
      setData(storageData);
      const link = "/detail/" + storageData.hotelInfo.id;
      setReturnLink(link);
    } else {
      router.push("/");
    }
  }, []);

  return (
    <Layout>
      <Head title="Enquiry" />
      <main className="enquiry">
        <div className="enquiry__top">
          <h1 className="enquiry__heading">Book Now</h1>
          <Link href={returnLink}>
            <a className="enquiry__link">Go Back</a>
          </Link>
        </div>

        <section className="enquiry__hotel-info">
          {data ? (
            <BookingInfo
              data={data}
              calculateRoomPrice={calculateRoomPrice}
              calculateDays={calculateDays}
              calculateSubtotal={calculateSubtotal}
            />
          ) : null}
        </section>
        <section className="enquiry__contact-info">
          {data ? (
            <BookingForm
              data={data}
              calculateRoomPrice={calculateRoomPrice}
              calculateDays={calculateDays}
              calculateSubtotal={calculateSubtotal}
            />
          ) : null}
        </section>
      </main>
      <Footer />
    </Layout>
  );
};

export default enquiry;

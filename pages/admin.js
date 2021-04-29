import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import Heading from "../components/Heading";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function admin() {
  const [auth] = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  });

  return (
    <Layout>
      <Head title="Admin" />
      <Heading title="Admin" />
    </Layout>
  );
}

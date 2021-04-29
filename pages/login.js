import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import Image from "next/image";

const login = () => {
  return (
    <div className="login">
      <Layout>
        <Head title="Login" />
        <main className="login__main">
          <h1 className="login__heading">Admin Login</h1>
          <div className="login__icon-wrapper">
            <Image
              src="/login-icon.svg"
              width="50"
              height="50"
              alt="hotel icon"
            />
          </div>
          <LoginForm />
        </main>
        <Footer />
      </Layout>
    </div>
  );
};

export default login;

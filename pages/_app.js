import "../sass/main.scss";
import "react-datepicker/dist/react-datepicker.css";

import { AuthProvider } from "../context/AuthContext";
import { EnquiryProvider } from "../context/EnquiryContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <EnquiryProvider>
        <Component {...pageProps} />
      </EnquiryProvider>
    </AuthProvider>
  );
}

export default MyApp;

import { createContext } from "react";
import useLocalStorage from "../utils/useLocalStorage";

const EnquiryContext = createContext([null, () => {}]);

export const EnquiryProvider = (props) => {
  const [enquiry, setEnquiry] = useLocalStorage("enquiry", null);
  return (
    <EnquiryContext.Provider value={[enquiry, setEnquiry]}>
      {props.children}
    </EnquiryContext.Provider>
  );
};

export default EnquiryContext;

import * as yup from "yup";

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("* Please enter your first name")
    .min(3, "* First Name must be at least 3 characters"),

  lastName: yup
    .string()
    .required("* Please enter your last name")
    .min(4, "* Last Name must be at least 4 characters"),

  email: yup
    .string()
    .required("* Please enter an email address")
    .email("* Please enter a valid email address"),

  phone: yup
    .string()
    .required("* Please enter your phone number")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "* Invalid phone number."
    ),
});

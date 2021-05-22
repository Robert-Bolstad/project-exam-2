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

  subject: yup
    .string()
    .required("* Please enter your last name")
    .min(4, "* Subject must be at least 4 characters"),

  message: yup
    .string()
    .required("* Please enter an message")
    .min(10, "* The message must be at least 10 characters"),
});

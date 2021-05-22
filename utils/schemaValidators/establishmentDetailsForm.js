import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),

  description: yup
    .string()
    .required("Please enter an description of your accommodation")
    .min(50, "The description must be at least 50 characters"),

  phone: yup
    .string()
    .required("Please enter your phone number")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid phone number."
    ),

  address: yup
    .string()
    .required("Please enter the  full address of your location"),

  name: yup
    .string()
    .required("Please enter the name of the hotel")
    .min(3, "The name must be at least 3 characters"),

  latitude: yup
    .string()
    .required("Please enter the latitude coordinates")
    .matches(/^(60.[0-9][0-9][0-9][0-9][0-9][0-9])$/, "invalid coordinates"),

  longitude: yup
    .string()
    .required("Please enter the longitude coordinates")
    .matches(/^(5.[0-9][0-9][0-9][0-9][0-9][0-9])$/, "invalid coordinates"),

  category: yup
    .string()
    .oneOf(
      ["hotel", "bed_and_breakfast", "guesthouse"],
      "Please select select an accommodation type"
    )
    .required("Please select your accommodation type"),
});

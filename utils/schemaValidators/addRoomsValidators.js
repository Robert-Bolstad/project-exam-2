import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter the room name")
    .min(4, "The name must be at least 4 characters"),

  price: yup
    .number()
    .typeError("Please enter the price per night")
    .min(1, "Minimum price 1$"),

  description: yup
    .string()
    .required("Please enter an short description of your room")
    .min(15, "The description must be at least 20 characters"),

  max_guests: yup
    .number()
    .typeError("Please enter the maximum number of guests in this room")
    .min(1, "Minimum 1 guest")
    .max(100, "I'm pretty sure you can't host over 100 guests!"),

  size_m2: yup
    .number()
    .typeError("Please enter the size in m2 of the room")
    .min(8, "Min size 8 m2"),

  bedrooms: yup
    .number()
    .typeError("Please enter the numbers of beds in this room")
    .min(1, "there must be at least 1 bedroom"),

  quantity: yup
    .number()
    .typeError(
      "Please enter the the quantity of this type of room you have available"
    )
    .min(1, "There must be at least 1 room"),
});

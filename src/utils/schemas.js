import * as Yup from "yup";

const phoneNumberRegex =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const addProfileSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must less 50 characters")
    .required("Name is required"),
  number: Yup.string()
    .required("Number is required")
    .matches(phoneNumberRegex, "Invalid phone number"),
});

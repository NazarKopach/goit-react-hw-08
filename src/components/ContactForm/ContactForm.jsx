import { ErrorMessage, Field, Form, Formik } from "formik";
import { addProfileSchema } from "../../utils/schemas";
import styles from "./ContactsForm.module.css";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import { selectContacts } from "../../redux/contactsSlice";

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    const duplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    if (duplicate) {
      actions.setFieldError("name", "Contact already exists!");
      return;
    }
    const finalUser = {
      ...values,
      id: nanoid(),
    };
    dispatch(addContact(finalUser));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addProfileSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label className={styles.label}>
          <span>Name: </span>
          <Field
            type="text"
            name="name"
            className={styles.input}
            placeholder="Name"
          />
          <ErrorMessage
            className={styles.ErrorMessage}
            name="name"
            component="span"
          />
        </label>
        <label className={styles.label}>
          <span>Number: </span>
          <Field
            className={styles.input}
            name="number"
            type="tel"
            placeholder="+380*******"
          />
          <ErrorMessage
            className={styles.ErrorMessage}
            name="number"
            component="span"
          />
        </label>
        <button className={styles.button} type="submit">
          Add profile
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;

import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginUserSchema } from "../../utils/schemas";
import { useDispatch, useSelector } from "react-redux";
import { apiLoginUser } from "../../redux/auth/operations";
import style from "./LoginForm.module.css";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (values, actions) => {
    dispatch(apiLoginUser(values));
    actions.resetForm();
  };

  return (
    <div className={style.login_form_div}>
      {error && <p className={style.errorText}>Error: {error}</p>}
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={LoginUserSchema}
        onSubmit={handleSubmit}
      >
        <Form className={style.form}>
          <label className={style.label}>
            <span>Email:</span>
            <Field
              type="text"
              name="email"
              className={style.input}
              placeholder="example.email@example.com"
            />
            <ErrorMessage
              className={style.errorMessage}
              name="email"
              component="span"
            />
          </label>
          <label className={style.label}>
            <span>Password:</span>
            <Field
              type="password"
              name="password"
              className={style.input}
              placeholder="Enter your password"
            />
            <ErrorMessage
              className={style.errorMessage}
              name="password"
              component="span"
            />
          </label>
          <button className={style.button} type="submit">
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

import { useFormik } from "formik";
import Input from "../Components/Common/Input";
import * as yup from "yup";
import { Link, withRouter } from "react-router-dom";
import { signupUser } from "../Services/HttpRequestMethods";
import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = ({ history }) => {
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    const { name, email, phoneNumber, password } = values;
    const userDate = {
      name,
      email,
      phoneNumber,
      password,
    };

    try {
      const { data } = await signupUser(userDate);
      history.push("/");
      setError(null);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "name must be more than 3 character"),
    email: yup
      .string()
      .email("email format is incorrect")
      .required("Email is required"),
    phoneNumber: yup
      .string()
      .required("phone nuber is required")
      .matches(/^[0-9]{11}$/, "invalid phone number"),
    password: yup
      .string()
      .min(8, "password at least must be 8 character")
      .required("password is required"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
    //   "Password is weak"
    // ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "confirm password is not match"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="signup_form">
      <h1>SignUp</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} label="Name" name="name" />
        <Input formik={formik} label="Email" name="email" type="email" />
        <Input
          formik={formik}
          label="Phone number"
          name="phoneNumber"
          type="phone"
        />
        <Input
          formik={formik}
          label="Password"
          name="password"
          type="password"
        />
        <Input
          formik={formik}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
        />
        <button type="submit" disabled={!formik.isValid}>
          SignUp
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to="/login">Alredy login?</Link>
      </form>
    </div>
  );
};

export default withRouter(SignupForm);
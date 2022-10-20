import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signUpError,
  signUpOnChange,
  signUpSubmit,
  signUpSuccess,
} from "../../redux/action/SignUpAction";
import Button from "../../reusable/Button";
import Form from "../../reusable/Form";
import { sigupField } from "../../utils/signupFields";
import Validation from "../Validation";

const Signup = () => {
  const { users, message, errors } = useSelector((state) => state.signUp);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newError = Validation(name, value);
    dispatch(signUpError({ [name]: newError }));
    dispatch(signUpOnChange({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};
    Object.entries(users).forEach(([name, value], i) => {
      const newerror = Validation(name, value);
      if (newerror) {
        error[name] = newerror;
      }
    });
    if (Object.keys(error).length > 0) {
      dispatch(signUpError(error));
      return;
    }
    dispatch(signUpSubmit(navigate));
  };

  return (
    <div className="container">
      <h1>Sign up</h1>
      <div>
        <form className="form-horizontal">
          <div className="container">
            <Form
              field={sigupField}
              Data={users}
              error={errors}
              handleChange={handleChange}
            />

            <div className="row">
              <Button clickHandler={handleSubmit}>SignUp</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

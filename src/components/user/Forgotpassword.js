import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import forgotPasswordSubmit, {
  forgotPassClear,
  forgotPassError,
  forgotPassOnChange,
} from "../../redux/action/ForgotPasswordAction";
import Validation from "../Validation";
import { useNavigate } from "react-router-dom";
import forgotPassField from "../../utils/forgotPassworField";
import ReusableForm from "../../reusable/ReusableForm";
import HelmetComp from "../../reusable/HelmetComp";

const Forgotpassword = () => {
  useEffect(() => {
    dispatch(forgotPassClear());
  }, []);

  const { users, message, errors, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newError = Validation(name, value);
    dispatch(forgotPassError({ [name]: newError }));
    dispatch(forgotPassOnChange({ [name]: value }));
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
      dispatch(forgotPassError(error));
      return;
    }
    dispatch(forgotPasswordSubmit());
    // navigate("/login");
  };

  const buttonArr = [
    {
      children: "Submit",
      onClick: handleSubmit,
      disabled: loading ? true : false,
    },
  ];

  return (
    <div className="container">
      <HelmetComp title="Forgot Password"/>
      <h1>Forgot Password</h1>
      <div>
        <ReusableForm
          field={forgotPassField}
          Data={users}
          error={errors}
          onChange={handleChange}
          buttonArr={buttonArr}
        />
      </div>
    </div>
  );
};

export default memo(Forgotpassword);

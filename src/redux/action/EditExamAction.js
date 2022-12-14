import {
  EDIT_EXAM_ERROR,
  EDIT_EXAM_FAIL,
  EDIT_EXAM_SUBMIT_REQ,
  EDIT_EXAM_SUCCESS,
} from "../constant/Index";

import { axiosApi } from "../../components/axios";
import { token } from "../../utils/Constant";
import { toastError, toastSuccess } from "./toastAction";

export const EditExamSuccess = (state) => {
  return {
    type: EDIT_EXAM_SUCCESS,
    payload: state,
  };
};

export const EditExamFail = (state) => {
  return {
    type: EDIT_EXAM_FAIL,
    payload: state,
  };
};

export const EditExamSubmitReq = () => {
  return {
    type: EDIT_EXAM_SUBMIT_REQ,
  };
};

export const EditExamError = (state) => {
  return {
    type: EDIT_EXAM_ERROR,
    payload: state,
  };
};

export const editExamPut = (id, editData, navigate) => {
  const token = localStorage.getItem("userToken");
  return async (dispatch) => {
    dispatch(EditExamSubmitReq());
    await axiosApi
      .put(`/dashboard/Teachers/editExam?id=${id}`, editData, {
        headers: {
          "access-token": token,
        },
      })
      .then((res) =>
        res.data.statusCode === 200
          ? (dispatch(EditExamSuccess(res.data.message)),
            toastSuccess(res.data.message),
            localStorage.removeItem("id"),
            navigate("/viewExam"))
          : (dispatch(EditExamError(res.data.message)),
            toastError(res.data.message))
      )
      .catch((err) => {
        dispatch(EditExamFail);
        console.log(err);
      });
  };
};

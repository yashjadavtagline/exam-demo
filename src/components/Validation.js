import { pass, re } from "../utils/regex";

const Validation = (name, value, userData) => {
  switch (name) {
    case "name":
      return !value ? "Please enter a Name" : "";

    case "email":
      return !value
        ? "please enter a email"
        : !re.test(value)
        ? "please enter valid email"
        : "";

    case "password":
      return !value
        ? "please enter a password"
        : !pass.test(value)
        ? "password Not valid"
        : "";

    case "oldPassword":
      return !value
        ? "please enter a password"
        : !pass.test(value)
        ? "password Not valid "
        : "";

    case "Password":
      return !value
        ? "please enter a password"
        : !pass.test(value)
        ? "password Not valid"
        : "";

    case "ConfirmPassword":
      return !value
        ? "please enter a password"
        : userData.Password && value !== userData.Password
        ? "Password and Confirm Password does not match."
        : "";

    case "role":
      return !value ? "Please select a role" : "";

    case "subjectName":
      return !value ? "Please select a subjectName" : "";

    case "question":
      return !value ? "Please Enter a question" : "";

    case "answer":
      return !value ? "Please select a answer" : "";

    case "ans1":
      return !value ? "Please Enter a ans1" : "";

    case "ans2":
      return !value ? "Please Enter a ans2" : "";

    case "ans3":
      return !value ? "Please Enter a ans3" : "";

    case "ans4":
      return !value ? "Please Enter a ans4" : "";

    case "option0":
      return !value ? "Please Enter a option1" : "";

    case "option1":
      return !value ? "Please Enter a option2" : "";

    case "option2":
      return !value ? "Please Enter a option3" : "";

    case "option3":
      return !value ? "Please Enter a option4" : "";

    case "notes":
      return !value ? "Please Enter a note" : "";

    default:
      break;
  }
};

export default Validation;

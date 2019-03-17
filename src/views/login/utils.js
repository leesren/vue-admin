import { validUsername } from "@/utils/validate";
export const validateUsername = (rule, value, callback) => {
  if (!validUsername(value)) {
    callback(new Error("Please enter the correct user name"));
  } else {
    callback();
  }
};
export const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error("The password can not be less than 6 digits"));
  } else {
    callback();
  }
};
export const validateConfirmPassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error("The confirm password can not be less than 6 digits"));
  } else {
    callback();
  }
};

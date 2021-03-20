import React from "react";
import SpinnerComponent from "../Spinner";
import { useSelector } from "react-redux";
import { selectUser } from "../../state/slices/user";
import { Redirect } from "react-router-dom";

const withAuth = (Component) => {
  const Auth = (props) => {
    const user = useSelector(selectUser);
    if (user.value && user.isRetrieved) {
      return <Component {...props} />;
    }
    //checking to see if user authenticated
    if (!user.value && !user.isRetrieved) {
      return <SpinnerComponent />;
    } else {
      //if user isnt authenticated
      return <Redirect to="/login" />;
    }
  };
  return Auth;
};

export default withAuth;

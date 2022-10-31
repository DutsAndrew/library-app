import React, { FC } from "react";
import '../style/SignInUser.css';

interface SignInProps {
  signInUser: Function,
}

const SignIn: FC<SignInProps> = (props): JSX.Element => {

  const { signInUser } = props;

  return (
    <div>Sign in User</div>
  );
};

export default SignIn;
import React, { FC, FormEventHandler } from "react";
import googleLogo from '../assets/google-logo.svg';

interface ExternalLoginProps {
  signInWithGoogleAccount: () => Promise<void>,
};

const ExternalLogIn: FC<ExternalLoginProps> = (props): JSX.Element => {

  const { signInWithGoogleAccount } = props;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    signInWithGoogleAccount();
  };

  return (
    <form id="external-login" onSubmit={handleSubmit} >
      <button id="sign-in-with-google-button" type="submit" >
        <p>Sign in with Google</p>
        <img id="google-logo-svg" src={googleLogo} alt="google logo" ></img>
      </button>
    </form>
  );
};

export default ExternalLogIn;
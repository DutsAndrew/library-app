import React, { FC, MouseEventHandler, FormEventHandler } from "react";
import '../style/AccountAuthentication.css';
import CreateAccount from './CreateAccount';
import SignIn from './SignInUser';
import ExternalLogIn from './ExternalLogIn';

interface AccountAuthenticationProps {
  createAccountWithEmailAndPassword: (email: string, password: string) => Promise<void>,
  signInUser: (email: string, password: string) => Promise<void>,
  signInWithGoogleAccount: () => Promise<void>,
};

const AccountAuthentication: FC<AccountAuthenticationProps> = (props): JSX.Element => {

  const { createAccountWithEmailAndPassword, signInUser, signInWithGoogleAccount } = props;

  return (
    <div id="account-authentication-dashboard">
      <CreateAccount createAccountWithEmailAndPassword={createAccountWithEmailAndPassword} />
      <SignIn signInUser={signInUser} />
      <ExternalLogIn signInWithGoogleAccount={signInWithGoogleAccount} />
    </div>
  );
};

export default AccountAuthentication;
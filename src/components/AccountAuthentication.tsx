import React, { FC, MouseEventHandler, FormEventHandler } from "react";
import '../style/AccountAuthentication.css';
import CreateAccount from './CreateAccount';
import SignIn from './SignInUser';
import ExternalLogIn from './ExternalLogIn';

interface AccountAuthenticationProps {
  submitAccountInformation: (email: string, password: string) => Promise<void>,
  signInUser: (email: string, password: string) => Promise<void>,
};

const AccountAuthentication: FC<AccountAuthenticationProps> = (props): JSX.Element => {

  const { submitAccountInformation, signInUser } = props;

  return (
    <div id="account-authentication-dashboard">
      <CreateAccount submitAccountInformation={submitAccountInformation} />
      <SignIn signInUser={signInUser} />
      <ExternalLogIn />
    </div>
  );
};

export default AccountAuthentication;
import React, { FC, MouseEventHandler } from "react";
import '../style/AccountAuthentication.css';
import CreateAccount from './CreateAccount';
import SignIn from './SignInUser';

interface AccountAuthenticationProps {
  userStatus: object,
  submitAccountInformation: MouseEventHandler<HTMLButtonElement>,
  signInUser: Function,
};

const AccountAuthentication: FC<AccountAuthenticationProps> = (props): JSX.Element => {

  const { userStatus, submitAccountInformation, signInUser } = props;

  return (
    <div id="account-authentication-dashboard">
      <CreateAccount submitAccountInformation={submitAccountInformation} />
      <SignIn signInUser={signInUser} />
    </div>
  );
};

export default AccountAuthentication;
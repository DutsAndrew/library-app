import React, { FC, FormEventHandler } from "react";
import '../style/SignInUser.css';

interface SignInProps {
  signInUser: (email: string, password: string) => Promise<void>,
}

const SignIn: FC<SignInProps> = (props): JSX.Element => {

  const { signInUser } = props;

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailEntry: any = document.querySelector('#email-login');
    const passwordEntry: any = document.querySelector('#password-login');
    if (emailEntry && passwordEntry) {
      if (emailEntry.validity.valid && passwordEntry.validity.valid) {
        signInUser(emailEntry.value, passwordEntry.value);
      };
    };
  };

  return (
    <form id="sign-in-form" onSubmit={handleSignIn} >
      <fieldset id="sign-in-fieldset" >
        <legend>Sign In:</legend>
        <label htmlFor="email-login" >*Email:</label>
        <input id="email-login" placeholder="JohnWick92@gmail.com"
          minLength={9}
          maxLength={253}
          type="email"
          required>
        </input>
        <label htmlFor="password-login" >*Password:</label>
        <input id="password-login" placeholder="********"
           minLength={8}
           maxLength={127}
           type="password"
           required>
        </input>
        <button id="sign-in-button" type="submit" >Sign In</button>
      </fieldset>
    </form>
  );
};

export default SignIn;
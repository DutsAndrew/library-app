import React, { FC, MouseEventHandler } from "react";

interface CreateAccountProps {
  submitAccountInformation: MouseEventHandler<HTMLButtonElement>,
};

const CreateAccount: FC<CreateAccountProps> = (props): JSX.Element => {

  const { submitAccountInformation } = props;

  const mailFormat: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordFormat: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm;

  const handleFormChange = (e: any): void => {
    const entryThatChanged: any = e.target;
    const errorText: any = e.target.nextSibling;
    if (entryThatChanged && errorText) {
      if ((entryThatChanged.validity.valid && entryThatChanged.value.match(mailFormat))
        || (entryThatChanged.validity.valid && entryThatChanged.value.match(passwordFormat))
      ) {
        errorText.textContent = "";
        errorText.className = "error";
      } else {
        showError(entryThatChanged, errorText);
      };
    };
  };

  const showError = (entry: any, error: any): void => {
    if (entry.id === 'email-input') {
      if (entry.validity.valueMissing) {
        error.textContent = "You need to enter an email address";
        error.classList.add("error", "error-active");
      } else if (!entry.value.match(mailFormat)) {
        error.textContent = `Your email address doesn't seem to follow the traditional email patterns, please try again`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooShort) {
        error.textContent = `Your email should be at least ${entry.minLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooLong) {
        error.textContent = `Your email should be no more than ${entry.maxLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      }
      return;
    };

    if (entry.id === 'password-input') {
      if (entry.validity.valueMissing) {
        error.textContent = "You need to enter a password";
        error.classList.add("error", "error-active");
      } else if (!entry.value.match(passwordFormat)) {
        error.textContent = `Your password must have at least: 1) One uppercase letter, 2) One lowercase letter, 3) One number, 4) One symbol, 5) And be at least 8 characters in length`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooShort) {
        error.textContent = `Your password should be at least ${entry.minLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooLong) {
        error.textContent = `Your password should be no more than ${entry.maxLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      }
      return;
    };

    if (entry.id === 'password-confirm-input') {
      if (entry.validity.valueMissing) {
        error.textContent = "You need to confirm your password";
        error.classList.add("error", "error-active");
      } else if (entry.value !== entry.previousSibling.previousSibling.value) {
        error.textContent = `Your passwords do not match`;
        error.classList.add("error", "error-active");
      }
      return;
    };
  };


  return (
    <form id="user-creation-form">
      <fieldset>
        <legend>Complete the fields below to create an account:</legend>
        <label htmlFor="email-input" >*Email:</label>
        <input id="email-input" 
          placeholder="JohnWick92@gmail.com"
          onChange={handleFormChange}
          minLength={9}
          maxLength={253}
          required>
        </input>
        <p id="email-input-error" className ="error-msg" ></p>
        <label htmlFor="password-input" >*Password:</label>
        <input id="password-input"
          placeholder="********"
          onChange={handleFormChange}
          minLength={8}
          maxLength={127}
          type="password"
          required>
        </input>
        <p id="password-input-error" className ="error-msg" ></p>
        <label htmlFor="password-confirm-input" >*Confirm Password:</label>
        <input id="password-confirm-input"
          placeholder="********"
          onChange={handleFormChange}
          minLength={8}
          maxLength={127}
          type="password"
          required>
        </input>
        <p id="password-confirm-input-error" className ="error-msg" ></p>
        <button id="account-submit"
          type="submit"
          onClick={submitAccountInformation} >
            Submit
        </button>
      </fieldset>
    </form>
  );
};

export default CreateAccount;
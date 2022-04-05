import { screen, waitFor, cleanup } from "@testing-library/react";
import App from "../../../App";
import userEvent from "@testing-library/user-event";
import FormPage from "../../formPage/FormPage";
import { customRender } from "../../../test-utils";
describe("Login Form Tests", () => {
  afterEach(cleanup);
  it("Navigate to Login Form", async () => {
    customRender(<App />);
    const authBtn = await screen.findAllByText("Login");
    const result = authBtn.map((btn) => {
      expect(btn).toBeInTheDocument();
      userEvent.click(btn);
      return waitFor(() => screen.findByText(/Log in to your account/i));
    });
    await Promise.all(result);
  });
  it("Render Login Form", async () => {
    //render Guest Button
    const { container } = customRender(<FormPage formType="login" />);
    const guestBtn = screen.getByText(/Continue as Guest/i);
    userEvent.click(guestBtn);
    const guestLoginBtn = await waitFor(() =>
      screen.findByText(/Start Exploring/i)
    );
    //check all inputs render
    const defaultInputs = [
      /What will you use this service for/i,
      /occupation/i,
      /organization/i,
    ];
    for (let regex of defaultInputs)
      expect(screen.getByText(regex)).toBeInTheDocument();
    //check if this input renders upon a change of org value
    const orgNameRegex = /organization name/i;
    const orgOption = screen.getByText("Yes");
    userEvent.click(orgOption);
    const orgName = await waitFor(() => screen.getByText(orgNameRegex));
    expect(orgName).toBeInTheDocument();
    const orgNoOption = screen.getByText("No");
    userEvent.click(orgNoOption);
    await waitFor(() => expect(orgName).not.toBeInTheDocument());

    //check if we can return to user page and login with google
    const backBtn = container.querySelector("button.login-guest-form-back-btn");
    if (backBtn) userEvent.click(backBtn);
    else throw new Error("could not find back to login btn");
    await waitFor(() => expect(guestLoginBtn).not.toBeInTheDocument);
    //main login btn
    expect(screen.getByText(/Continue as Guest/i)).toBeInTheDocument();
  });
});


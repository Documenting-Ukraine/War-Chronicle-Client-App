import App from "../../../App";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RequestAccessForm from "../forms/requestAccessForm/RequestAccessForm";
import { customRender } from "../../../test-utils";
test("Navigate to Contributor Form", async () => {
  customRender(<App />);
  const authBtn = await screen.findAllByText("Login");
  expect(authBtn[0]).toBeInTheDocument();
  userEvent.click(authBtn[0]);
  await waitFor(() => screen.findByText(/Log in to your account/i));
  const requestJoinLink = screen.getByText(/Request to join/i);
  expect(requestJoinLink).toBeInTheDocument();
  userEvent.click(requestJoinLink);
    await waitFor(() => screen.findByText(/Become a Contributor/i));
});


test("Access Form All Inputs Render", async () => {
    customRender(<RequestAccessForm />);
    const defaultInputs = [
        /First Name/,
        /Last Name/,
        /Gmail Account/,
        /Occupation/,
        /Why do you want to join/,
        /How should we contact you/,
        /Submit/
    ];
    defaultInputs.map((regex) => {
        expect(screen.getByText(regex)).toBeInTheDocument();
    });
    //Test hiding and appearing of phone input
    const phoneNumAns = screen.getByText("Phone Number")
    expect(phoneNumAns).toBeInTheDocument()
    userEvent.click(phoneNumAns)
    const phoneNumLabel = await waitFor(() => screen.findByTestId("Phone Number"))
    expect(phoneNumLabel).toBeInTheDocument()
    const gmailOption = screen.getByText(/Gmail Address/i)
    userEvent.click(gmailOption)
    await waitFor(() => {
        expect(phoneNumLabel).not.toBeInTheDocument()
    });
});


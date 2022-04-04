import App from "../../../App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
describe('Request Access Form', () => {
    test("All inputs render", async () => {
         render(
            <App />
        );
        const authBtn = screen.getAllByText("Login")[0]
        userEvent.click(authBtn)
        screen.debug()
        const loginPage = await waitFor(
          () =>
            // expect(
              screen.findByText(/Log in to your account/i)
          , { timeout: 3000 }
        );
    });
})

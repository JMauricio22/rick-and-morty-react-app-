/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, cleanup, screen, waitFor } from "@testing-library/react";
import Home from "../../pages/Home/Index";

afterEach(cleanup);
jest.mock("../../services/characters");

describe("<Home />", () => {
  test("Should displayed a spinner while load data from internet and then show a list of characters", async () => {
    // Render component
    const utils = render(<Home />);

    // The spinner element is displayed while fetch data
    const spinner = utils.getByRole("status");
    expect(spinner).toBeInTheDocument();

    // A list of characters is displayed
    await waitFor(() => {
      expect(screen.getAllByTestId("CharacterCard").length).toBe(2);
    });
  });
});

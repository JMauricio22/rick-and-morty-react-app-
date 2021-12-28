import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../../pages/Home/Index";

jest.mock("../../services/characters");
jest.mock("../../components/CharacterCard/Index", () => ({
  __esModule: true,
  default: (props) => <h1> {props.character.name} </h1>,
}));

describe("<Home />", () => {
  test.only("Should displayed a spinner while load data from internet and then show a list of characters", async () => {
    // Render component
    render(<Home />);

    // The spinner element is displayed while fetch data
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();

    // A list of characters is displayed
    await waitFor(() => {
      expect(screen.getAllByTestId("Col:Character").length).toBe(2);
    });
  });
});

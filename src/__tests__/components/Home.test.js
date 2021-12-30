import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "../../pages/Home/Index";
import { getAllCharacters, characters } from "../../services/characters";

jest.mock("../../services/characters");
jest.mock("../../components/CharacterCard/Index", () => ({
  __esModule: true,
  default: (props) => <h1> {props.character.name} </h1>,
}));

describe("<Home />", () => {
  test("Should displayed a spinner while load data from internet and then show a list of characters", async () => {
    getAllCharacters.mockResolvedValue({
      data: characters,
      info: {
        next: "",
        prev: "",
      },
    });

    // Render component
    render(<Home />);

    // The spinner element is displayed while fetch data
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();

    // A list of characters is displayed
    await waitFor(() => {
      expect(screen.getAllByTestId("Col:Character")).toHaveLength(2);
    });
  });

  test("Should show an alert when the API request fails", async () => {
    getAllCharacters.mockRejectedValue(new Error("Api Error"));

    // Render component
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  test("I should call getAllCharacters when the user has scrolled to the bottom of the page", async () => {
    getAllCharacters.mockResolvedValue({
      data: characters,
      info: {},
    });

    render(<Home />);

    expect(await screen.findAllByTestId("Col:Character")).toHaveLength(2);

    // set a diferent id a on each character
    getAllCharacters.mockResolvedValue({
      data: characters.map((char) => ({
        ...char,
        id: char.id + characters.length,
      })),
      info: {},
    });

    // set the scroll to the bottom of the page
    window.scrollY = 100;
    window.innerHeight = 100;

    Object.defineProperty(document.body, "clientHeight", {
      value: 200,
    });

    // Scroll event
    fireEvent(window, new CustomEvent("scroll"));

    // check if getAllCharacters is called when the bottom of the page is reached
    await waitFor(() => {
      expect(getAllCharacters).toHaveBeenCalledTimes(2);
    });
  });
});

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../../pages/Home/Index";
import { getAllCharacters } from "../../services/characters";

jest.mock("../../services/characters", () => ({
  __esModule: true,
  getAllCharacters: jest.fn(),
}));
jest.mock("../../components/CharacterCard/Index", () => ({
  __esModule: true,
  default: (props) => <h1> {props.character.name} </h1>,
}));

describe("<Home />", () => {
  test("Should displayed a spinner while load data from internet and then show a list of characters", async () => {
    getAllCharacters.mockResolvedValue([
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: {
          name: "Earth (C-137)",
        },
        location: {
          name: "Citadel of Ricks",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
      {
        id: 2,
        name: "Morty Smith",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: {
          name: "unknown",
        },
        location: {
          name: "Citadel of Ricks",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
    ]);

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

  test("Should show an alert when the API request fails", async () => {
    getAllCharacters.mockRejectedValue(new Error("Api Error"));

    // Render component
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });
});

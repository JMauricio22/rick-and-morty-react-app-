import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Favorites from "../../pages/Favorites/Index";
import useFavorites from "../../hooks/useFavorites";

jest.mock("../../hooks/useFavorites", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../components/CharacterCard/Index", () => ({
  __esModule: true,
  default: (props) => <h1> {props.character.name} </h1>,
}));

describe("<Favorites />", () => {
  test("Should show an alert when no items are found in favorites", () => {
    useFavorites.mockReturnValue([{}]);
    render(<Favorites />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  test("should show a list of items when favorites are found", async () => {
    useFavorites.mockImplementation(() => {
      const favorites = {
        1: {
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
        2: {
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
      };
      return [favorites];
    });

    render(<Favorites />);

    await waitFor(() => {
      expect(screen.getAllByTestId("Div::Col").length).toBe(2);
    });
  });
});

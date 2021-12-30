import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Favorites from "../../pages/Favorites/Index";
import useFavorites from "../../hooks/useFavorites";
import { characters } from "../../services/characters";

jest.mock("../../services/characters");

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
      const favorites = characters.reduce(
        (obj, character) => ({ ...obj, [character.id]: character }),
        {}
      );
      return [favorites];
    });

    render(<Favorites />);

    await waitFor(() => {
      expect(screen.getAllByTestId("Div::Col").length).toBe(2);
    });
  });
});

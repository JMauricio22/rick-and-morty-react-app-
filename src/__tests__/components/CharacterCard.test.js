import React, { useState } from "react";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacterCard from "../../components/CharacterCard/Index";

const character = {
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
};

function renderCharacterCard() {
  const updateFavoritesMock = jest.fn();

  function CharacterCardWrapper() {
    const [isFavorite, setFavorite] = useState(true);

    const updateFavorites = updateFavoritesMock.mockImplementation(() => {
      setFavorite(false);
    });

    return (
      <CharacterCard
        character={character}
        isFavorite={isFavorite}
        updateFavorites={updateFavorites}
      />
    );
  }

  return {
    CharacterCardWrapper,
    updateFavoritesMock,
  };
}

describe("<CharacterCard />", () => {
  test("when the character is in favorites the svg icon should have an attribute called prefix with value of fas", async () => {
    const updateFavorites = jest.fn();
    let svgIcon;

    render(
      <CharacterCard
        character={character}
        isFavorite={true}
        updateFavorites={updateFavorites}
      />
    );

    // Get favorites button
    const favoritesButton = screen.getByRole("button");
    expect(favoritesButton).toBeInTheDocument();

    //Get svg image icon within favorites button
    svgIcon = within(favoritesButton).getByTestId("Svg::Icon");

    //Verify that the prefix attribute on the favorites button has the value fas
    expect(svgIcon).toHaveAttribute("data-prefix", "fas");
  });

  test("when the favorites button is clicked the svg icon must have the data-prefix attribute in far", async () => {
    let svgIcon;

    const { CharacterCardWrapper, updateFavoritesMock } = renderCharacterCard();

    render(<CharacterCardWrapper />);

    // Get favorites button
    const favoritesButton = screen.getByRole("button");

    //Get svg image icon within favorites button
    svgIcon = within(favoritesButton).getByTestId("Svg::Icon");

    // Check svg icon have attribute called data-prefix with value fas
    expect(svgIcon).toHaveAttribute("data-prefix", "fas");

    // //Simulate click event in favorites button
    userEvent.click(favoritesButton);

    //Check if updateFavorites function is called
    expect(updateFavoritesMock).toHaveBeenCalled();

    await waitFor(() => {
      // Check svg icon have attribute called data-prefix with value far
      expect(svgIcon).toHaveAttribute("data-prefix", "far");
    });
  });
});

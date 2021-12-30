import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Profile from "../../pages/Profile/Index";
import { getCharacterById, character } from "../../services/characters";

jest.mock("../../services/characters");

describe("<Profile />", () => {
  test("Should show an spinner while loading data from the API and then showing the information of a character", async () => {
    getCharacterById.mockResolvedValue(character);

    // Render Profile
    render(<Profile />);

    // Check if spinner is displayed
    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(() => {
      //Check if the h1 has the character's name
      expect(screen.getByTestId("H1::Name")).toHaveTextContent("Rick Sanchez");
    });

    //Check if the img has src attribute with value  https://rickandmortyapi.com/api/character/avatar/1.jpeg
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    );
  });

  test("Should show an Alert when something is wrong", async () => {
    getCharacterById.mockRejectedValue(new Error("Api Error!!!"));

    // Render Profile
    render(<Profile />);

    // Check if spinner is displayed
    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(() => {
      //Check if the alert component is displayed
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  test("Should show page not found when the api request returns the 404 status code", async () => {
    class AxiosResponseError extends Error {
      response = {
        status: 404,
      };
    }
    getCharacterById.mockRejectedValue(new AxiosResponseError());

    // Render Profile
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Check if spinner is displayed
    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(() => {
      //Check if the h1 component is displayed
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    //check if element h1 has the text 404
    expect(screen.getByRole("heading")).toHaveTextContent("404");
  });
});

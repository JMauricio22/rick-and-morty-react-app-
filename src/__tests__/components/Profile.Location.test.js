import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Location from "../../pages/Profile/components/Location";
import axios from "axios";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("<Location />", () => {
  test("Should show spinner while API data is loading and then character info is displayed", async () => {
    axios.get.mockResolvedValue({
      data: {
        name: "Earth (C-137)",
        type: "Planet",
        dimension: "Dimension C-137",
      },
    });

    render(<Location url='https://rickandmortyapi.com/api/location/1' />);

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("H3::Name")).toBeInTheDocument();
    });
  });

  test("Should show location unknown when the url prop is empty", async () => {
    render(<Location url='' />);

    await waitFor(() => {
      expect(screen.getByRole("heading")).toHaveTextContent("Location Unknown");
    });
  });

  test("Should show an error message when an error occurs in the API request", async () => {
    axios.get.mockRejectedValue(new Error("Api Error!!!"));

    render(<Location url='https://rickandmortyapi.com/api/location/1' />);

    await waitFor(() => {
      expect(screen.getByRole("heading")).toHaveTextContent(
        "something went wrong getting the location 😢"
      );
    });
  });
});

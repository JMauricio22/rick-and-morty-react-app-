import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Origin from "../../pages/Profile/components/Origin";
import axios from "axios";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("<Origin />", () => {
  test("Should show spinner while API data is loading and then character info is displayed", async () => {
    axios.get.mockResolvedValue({
      data: {
        name: "Earth (C-137)",
        type: "Planet",
        dimension: "Dimension C-137",
      },
    });

    render(<Origin url='https://rickandmortyapi.com/api/location/1' />);

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("H3::Name")).toBeInTheDocument();
    });
  });

  test("Should show origin unknown when the url prop is empty", async () => {
    render(<Origin url='' />);

    await waitFor(() => {
      expect(screen.getByRole("heading")).toHaveTextContent("Origin Unknown");
    });
  });

  test("Should show an error message when an error occurs in the API request", async () => {
    axios.get.mockRejectedValue(new Error("Api Error!!!"));

    render(<Origin url='https://rickandmortyapi.com/api/location/1' />);

    await waitFor(() => {
      expect(screen.getByRole("heading")).toHaveTextContent(
        "something went wrong getting the origin 😢"
      );
    });
  });
});

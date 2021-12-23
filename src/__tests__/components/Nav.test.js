import { render, screen } from "@testing-library/react";
import Nav from "../../components/Nav/Index";
import { BrowserRouter } from "react-router-dom";

describe("<Nav />", () => {
  test("Render Nav", () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toMatchSnapshot();
  });
});

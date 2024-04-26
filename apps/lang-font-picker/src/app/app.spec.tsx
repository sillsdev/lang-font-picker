import { render } from "@testing-library/react";

import App from "./app";

describe("App", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it("should have the title", () => {
    const { getAllByText } = render(<App />);
    expect(getAllByText(/Language Font Picker/i).length).toBeGreaterThanOrEqual(
      1
    );
  });
});

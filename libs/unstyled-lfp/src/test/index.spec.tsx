import { render } from "@testing-library/react";

import UnstyledLanguageFontPicker from "..";

describe("UnstyledLanguageFontPicker", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<UnstyledLanguageFontPicker />);
    expect(baseElement).toBeTruthy();
  });
});

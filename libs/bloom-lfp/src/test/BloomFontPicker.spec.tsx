import { render } from "@testing-library/react";

import BloomFontPicker from "../BloomFontPicker";

describe("BloomFontPicker", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <BloomFontPicker currentFontName="" languageNumber={0} />
    );
    expect(baseElement).toBeTruthy();
  });
});

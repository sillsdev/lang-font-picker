import { FontFamilyLFF, FontLFF } from "../types";
import { convertToFontLFP, fetchJSON } from "../utils";

describe("convertToFontLFP", () => {
  const emptyFontLFF: FontLFF = {
    apiversion: "",
    defaultfamily: [],
    families: {},
  };
  const mockId = "fontsans";
  const mockName = "Font Sans";
  const mockDefault = [mockId];
  const mockFamily: FontFamilyLFF = {
    distributable: false,
    familyid: mockId,
    family: mockName,
  };
  const mockFamilies = { [mockId]: mockFamily };

  it("handles empty `defaultfamilies`", () => {
    const fontLFP = convertToFontLFP({
      ...emptyFontLFF,
      families: mockFamilies,
    });
    expect(fontLFP.name).toEqual("");
  });

  it("handles empty `families`", () => {
    const fontLFP = convertToFontLFP({
      ...emptyFontLFF,
      defaultfamily: mockDefault,
    });
    expect(fontLFP.name).toEqual(mockId);
  });

  it("gets font name", () => {
    const fontLFP = convertToFontLFP({
      ...emptyFontLFF,
      defaultfamily: mockDefault,
      families: mockFamilies,
    });
    expect(fontLFP.name).toEqual(mockName);
  });
});

describe("fetchJson", () => {
  it("throws error on non-JSON url", async () => {
    await expect(
      async () => await fetchJSON("https://lff.languagetechnology.org/lang/1")
    ).rejects.toThrow();
  });

  it("returns object when url returns valid JSON", async () => {
    const object: FontLFF = (await fetchJSON(
      "https://lff.languagetechnology.org/lang/kfc"
    )) as FontLFF;
    expect(object).toBeTruthy();
  });
});

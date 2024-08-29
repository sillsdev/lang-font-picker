import { FontFamilyLFF, FontLFF } from "../types";
import { convertToFontLFP, fetchJSON } from "../utils";

describe("convertToFontLFP", () => {
  const emptyFontLFF: FontLFF = {
    apiversion: "",
    defaultfamily: [],
    families: {},
  };
  const mockId = "fontInFamilies";
  const mockName = "Font Sans";
  const mockDefault = [mockId, "fontOutOfFamilies"];
  const mockFamily: FontFamilyLFF = {
    distributable: false,
    familyid: mockId,
    family: mockName,
  };
  const mockFamilies = { [mockId]: mockFamily };

  it("handles empty `defaultfamily`", () => {
    const fontLFP = convertToFontLFP({
      ...emptyFontLFF,
      families: mockFamilies,
    });
    expect(fontLFP).toHaveLength(0);
  });

  it("handles some but not all ids in `families`", () => {
    const fontLFP = convertToFontLFP({
      ...emptyFontLFF,
      defaultfamily: mockDefault,
      families: mockFamilies,
    });
    expect(fontLFP).toHaveLength(mockDefault.length);
    expect(fontLFP[0].name).toEqual(mockName);
    expect(fontLFP[1].name).toEqual(mockDefault[1]);
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

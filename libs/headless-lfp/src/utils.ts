import type { FontLFF, FontLFP } from "./types";

/** Given a url, returns the content of the result as a JSON. */
// ToDo: Add unit tests and verify this works with the LFF api url.
export async function fetchJSON(url: string): Promise<object> {
  const response = await fetch(url);
  if (response.ok) {
    return JSON.parse(await (await response.blob()).text());
  } else {
    return Promise.reject(response.statusText);
  }
}

/** Default conversion of LFF font metadata to LFP font metadata. */
export function convertToFontLFP(fonts: FontLFF): FontLFP[] {
  const { defaultfamily, families } = fonts;
  return defaultfamily.map((id) => ({
    distributable: families[id]?.distributable,
    license: families[id]?.license,
    name: id in families ? families[id].family : id,
  }));
}

import { FontLFF, FontLFP } from './types';

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
export function convertToFontLFP(font: FontLFF): FontLFP {
  const { defaultfamily, families } = font;
  if (!defaultfamily.length) {
    return { name: '' };
  }

  const id = defaultfamily[0];
  if (!(id in families)) {
    return { name: id };
  }

  return { name: families[id].family };
}

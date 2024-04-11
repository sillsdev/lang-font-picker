/** Given a url, returns the content of the result as a JSON. */
// ToDo: Add unit tests and verify this works with the LFF api url.
export async function fetchJSON(url: string): Promise<object> {
  const resp = await fetch(url);
  if (resp.ok) {
    return JSON.parse(await (await resp.blob()).text());
  } else {
    return Promise.reject(resp.statusText);
  }
}

import { act, renderHook } from '@testing-library/react';

import useLanguageFontFinder from '../language-font-finder';

describe('useLanguageFontFinder', () => {
  it('should render successfully', async () => {
    const { result } = renderHook(() => useLanguageFontFinder());

    const {error,finding } = result.current
    expect(error).toBeFalsy();
    expect(finding).toBeFalsy();
  });

  it('should error when lff queried for a number', async () => {
    const { result } = renderHook(() => useLanguageFontFinder());

    expect(result.current.error).toBeFalsy();

    await act(async () => {
     await result.current.findFonts("1");
    });

    expect(result.current.error).toBeTruthy();
  });
});

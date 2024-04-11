import { act, renderHook } from '@testing-library/react';
//import { vi } from 'vitest'

import useLanguageFontPicker from '../index';

describe('useLanguageFontPicker', () => {
  it('should render successfully', () => {

    const { result } = renderHook(() => useLanguageFontPicker());

    expect(result.current.fonts).toHaveLength(0);

    act(() => {
      result.current.getFonts("ar");
    });

    // ToDo: Mock out useLanguageFontFinder
    // https://vitest.dev/guide/mocking.html
    expect(result.current.fonts).toHaveLength(0);
  });
});

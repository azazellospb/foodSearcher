/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDebounce = (callback: (...params: any) => void, delay: number) => {
  const timer = useRef<NodeJS.Timeout>();
  const debouncedCallback = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callback();
    }, delay);
  }, [callback, delay]);
  return debouncedCallback();
};

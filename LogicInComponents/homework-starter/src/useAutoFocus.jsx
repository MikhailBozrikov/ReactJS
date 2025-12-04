import { useRef, useEffect } from 'react';

export function useAutoFocus(isNew) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isNew && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isNew]);

  return inputRef;
}
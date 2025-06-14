import { useEffect, useState } from "react";

/**
 * 입력을 버퍼링하는 훅.
 * 서버에 입력값이 바뀔 때마다 요청을 보내는 대신,
 * delay를 주어, 네트워크 요청을 줄이고, 서버 부담을 줄인다.
 * Searchbar 등의 컴포넌트에서 유용하게 사용될 수 있다.
 */

export function useBufferedInput<T>(value: T, delay: number): T {
  const [bufferedValue, setBufferedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setBufferedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return bufferedValue;
}

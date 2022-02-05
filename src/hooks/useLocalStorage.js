import { useState, useEffect } from "react";

/** Custom hook for keeping state data synced with localStorage
 *
 * creates `item` as state and looks in localStorage for current value
 *
 * when `item` is changed, it is set in localStorage
 *
 * to the component, acts like state that is synced to localStorage
 *
 * const [myThing, setMyThing] = useLocalStorage("myThing");
 */

function useLocalStorage(key, firstValue = null) {
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(
    function setKeyInLocalStorage() {
      if (item === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, item);
      }
    },
    [key, item]
  );

  return [item, setItem];
}

export default useLocalStorage;

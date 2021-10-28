import { useEffect, useState } from "react";

// Custom hook function name MUST start with 'use'
const useCounter = (forwards = true) => {
  // 'use' signals to react the function will be a custom hook.
  // Gives React the guarantee the function will respect to the rules of hooks. (https://reactjs.org/docs/hooks-rules.html)

  const [counter, setCounter] = useState(0);
  // Wherever you call the custom hook (i.e. ForwardCounter), the state or effect will be tied to said component.
  // If we use the custom hook in multiple components, then they each will receive their own state.
  // Just because we use a custom hook, does NOT mean we share state or effects across components.

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);

  // custom hooks are just functions and therefor can return things
  // To make the 'counter' state available within the components that use it, we simply need to return it.
  return counter;
  // You can return whatever you want in your custom hooks
  // i.e. an array, object, string, number etc.
};

export default useCounter;

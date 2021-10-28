import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback is used to prevent infinite re-renders
  // without it, useEffect would call sendRequest over and over because we are updating its state values and thus rendering App.js where it is called.
  // useCallback simply returns its memoized (cached) values if nothing has changed
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
      // outsources data conversion logic to separate function
      // allows our custom hook to be generic and reusable
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  // We want to utilise our state values and sendRequest function.
  // So we simply return these values, as custom hooks can return anything!
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;

/*

UseCallback (with its proper array dependencies)

is required,  otherwise an infinite loop occurs.

sendRequest (aka: fetchTasks) will be "changed".

"changed" meaning;  recreated & destroyed over & over.

- - - - - - - - - - - - - - - - - - -

useCallback (with its its proper array dependencies)

will prevent sendRequest (aka: fetchTasks) from "changing",

due to the App component & useHttp hook re-rendering,

So sendRequest (aka: fetchTasks) only invokes when it is called.

- - - - - - - - - - - - - - - - - - -

requestConfig (object) & applyData() (function)

are the useCallback array dependencies that tell

useCallback to not memoize (not cache) the enclosed function,

when one of its dependencies change.

Otherwise,  return the same (cached) reference.

- - - - - - - - - - - - - - - - - - -

Without useCallback:

requestConfig & applyData will also be

recreated & destroyed ("changed") over & over.

In this compromised situation ...

Since they are useCallback array dependencies,

they tell useCallback to not memoize (not cache).

This contributes to the infinite loop.

*/

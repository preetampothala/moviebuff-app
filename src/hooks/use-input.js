import { useState, useCallback } from "react";
const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = useCallback((fromwatchlist) => {
    if (fromwatchlist) {
      setEnteredValue(fromwatchlist);
    } else {
      setEnteredValue("");
      setIsTouched(false);
    }
  }, []);

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    isTouched,
  };
};

export default useInput;

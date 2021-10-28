import useCounter from "../hooks/use-counter";
import Card from "./Card";

const ForwardCounter = () => {
  // make use of the returned value by storing it in a variable
  const counter = useCounter();

  return <Card>{counter}</Card>;
};

export default ForwardCounter;

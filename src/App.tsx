import "./App.css";
import { Button } from "./components/ui/button";
import { decrement, increment } from "./redux/features/counter/counterSlice";

import { useAppDispatch, useAppSelector } from "./redux/hook";

function App() {
  const dispatch = useAppDispatch();
  const { count } = useAppSelector((state) => state.counter);

  const handleIncrement = (amount: number) => {
    dispatch(increment(amount));
  };
  const handleDecrement = () => {
    dispatch(decrement());
  };
  return (
    <div>
      <h1>Counter with redux</h1>
      <Button onClick={() => handleIncrement(5)}>Increment By 5</Button> <br /> <br />
      <Button onClick={() => handleIncrement(1)}>Increment</Button>
      <p>{count}</p>
      <Button onClick={handleDecrement}>Deccrement</Button>
    </div>
  );
}

export default App;

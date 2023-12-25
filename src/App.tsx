import { createSignal } from "solid-js";
import "./App.css";

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="w-full">
      <p>Current count: {count()}</p>

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCount(count() + 1)}
      />
    </div>
  );
}

export default App;

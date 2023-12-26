import { createSignal } from "solid-js";

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="w-full h-screen bg-background flex items-center justify-center flex-col">
      <p>Current count: {count()}</p>

      <button
        class="bg-primary hover:bg-accent text-text font-bold py-2 px-4 rounded"
        onClick={() => setCount(count() + 1)}
      >
        Increment +
      </button>
    </div>
  );
}

export default App;

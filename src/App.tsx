import { createSignal } from "solid-js";
import { NavBar } from "./Navbar";
import { HeaderTitle } from "./HeaderTitle";

function App() {
  const [theme, setTheme] = createSignal("light");

  return (
    <div
      class="w-full h-screen bg-background py-6 px-8"
      classList={{
        dark: theme() === "dark",
      }}
    >
      <NavBar theme={theme} setTheme={setTheme} />
      <HeaderTitle />
    </div>
  );
}

export default App;

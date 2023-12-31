import { Show, createSignal } from "solid-js";
import { NavBar } from "./components/Navbar";
import { HeaderTitle } from "./components/HeaderTitle";
import { MainBox } from "./components/MainBox";

function App() {
  const [theme, setTheme] = createSignal("light");

  return (
    <div
      class="w-full h-screen bg-background py-6 px-8 relative"
      classList={{
        dark: theme() === "dark",
      }}
    >
      <div class={"w-full h-full absolute top-0 left-0"}>
        <Show
          when={theme() === "light"}
          fallback={
            <img src="/images/Grid_dark.svg" alt="" class="w-full h-full"></img>
          }
        >
          <img src="/images/Grid.svg" alt="" class="w-full h-full"></img>
        </Show>
      </div>
      <NavBar theme={theme} setTheme={setTheme} />
      <HeaderTitle />
      <div class="w-full flex items-center justify-center font-poppins mt-8 flex-col">
        <div class="text-xl text-text flex flex-row gap-1">
          Create a blazingly <p class="font-bold">fast</p>, easy to{" "}
          <p class="font-bold">remember</p>, and{" "}
          <p class="font-bold">shareable</p>
        </div>
        <p class="text-xl text-text">shortened URL.</p>
      </div>
      <MainBox theme={theme} />
    </div>
  );
}

export default App;

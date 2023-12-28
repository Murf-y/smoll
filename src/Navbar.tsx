import { Show } from "solid-js";

function NavBar({
  theme,
  setTheme,
}: {
  theme: () => string;
  setTheme: (v: string | ((prev: string) => string)) => string;
}) {
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div class="w-full flex items-center justify-between z-10 relative">
      <img src="/images/Logo.svg" alt="Logo"></img>
      <button onClick={toggleTheme}>
        <Show
          when={theme() === "light"}
          fallback={<img src="/icons/sun.svg" alt="theme"></img>}
        >
          <img src="/icons/moon.svg" alt="theme"></img>
        </Show>
      </button>
    </div>
  );
}

export { NavBar };

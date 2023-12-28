import { SolidTyper } from "solid-typer";

function HeaderTitle() {
  return (
    <div class="text-4xl text-text w-full flex items-center justify-center font-poppins font-semibold mt-4 flex-row gap-3">
      <p>Short URLs are</p>
      <div class="flex flex-col gap-0">
        <SolidTyper
          text={["Better!", "Shorter!", "Simpler!"]}
          backspaceSpeed={75}
          typingSpeed={100}
          loop={true}
          typingPause={1000}
        />
        {/* <div class="h-0.5 bg-primary absolute top-0 left-0"></div> */}
      </div>
    </div>
  );
}

export { HeaderTitle };

import { createSignal } from "solid-js";

function URLShortener() {
  const [url, setUrl] = createSignal("");

  const shortenUrl = () => {
    console.log("shortenUrl, url: ", url());
  };

  return (
    <div class="py-8 px-14 w-full h-full flex flex-col justify-between items-end">
      <div class="flex flex-col items-start gap-4 w-full">
        <div class="text-text font-medium text-lg font-poppins">
          Shorten a long URL
        </div>
        <input
          type="text"
          class="w-full bg-background border-2 border-text opacity-30 focus:border-accent focus:text-accent focus:opacity-100 rounded-sm px-4 py-2 text-text font-poppins"
          placeholder="Enter or Paste a URL here"
          value={url()}
          onInput={(e) => setUrl(e.currentTarget.value)}
        />
      </div>
      <button
        class="bg-primary hover:bg-accent text-text font-poppins font-medium hover:font-semibold rounded-sm px-4 py-2 w-fit"
        onClick={shortenUrl}
      >
        Shorten
      </button>
    </div>
  );
}

export default URLShortener;

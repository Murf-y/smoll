import { Show, createSignal } from "solid-js";
import { LinksApi } from "../api/links";

function URLShortener() {
  const [url, setUrl] = createSignal("");
  const [error, setError] = createSignal("");
  const [shortenedUrl, setShortenedUrl] = createSignal("");
  const [copuButton, setCopyButton] = createSignal("Copy");
  const [shortenButtonEnabled, setShortenButtonEnabled] = createSignal(true);

  const shortenUrl = async () => {
    if (!shortenButtonEnabled) return;

    setError("");
    setShortenedUrl("");
    setShortenButtonEnabled(false);
    try {
      const regex = new RegExp(
        "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})",
        "i"
      );

      if (!regex.test(url())) {
        throw new Error("Invalid URL, please enter a valid URL");
      }

      const res = await new LinksApi().create({
        longUrl: url(),
      });

      setShortenedUrl(window.location.origin + "/" + res.payload.shortUrl);
      setShortenButtonEnabled(true);
    } catch (e) {
      setShortenButtonEnabled(true);
      if (e instanceof Error) {
        console.log(e.message);
        setError(e.message);
      } else {
        console.log(e);
        setError("Something went wrong, please try again later");
      }
    }
  };

  return (
    <div class="py-4 sm:py-8 px-4 sm:px-14 w-full h-full flex flex-col justify-between items-end">
      <div class="flex flex-col items-start gap-4 w-full">
        <div class="text-text font-medium text-sm sm:text-lg font-poppins">
          Shorten a long URL
        </div>
        <input
          type="text"
          class="w-full bg-background border-2 border-text opacity-30 focus:border-accent focus:text-accent focus:opacity-100 rounded-sm px-2 sm:px-4 py-2 text-text text-sm sm:text-base font-poppins"
          placeholder="Enter or Paste a URL here"
          value={url()}
          onInput={(e) => setUrl(e.currentTarget.value)}
        />
      </div>
      <Show when={shortenedUrl()}>
        <div class="w-full border-primary border-2 h-20 sm:h-12 font-poppins text-xs sm:text-sm text-primary flex items-start sm:items-center pl-2 pr-1 justify-between py-2 flex-col sm:flex-row text-wrap overflow-x-scroll overflow-y-hidden sm:overflow-hidden">
          {shortenedUrl()}
          <div class="flex flex-row gap-1 items-center justify-center min-h-fit place-self-end sm:place-self-auto">
            <a
              href={shortenedUrl()}
              target="_blank"
              class="bg-primary hover:bg-accent text-text font-poppins font-medium hover:font-semibold rounded-sm px-2 py-2 w-fit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
            <button
              class="bg-primary hover:bg-accent text-text font-poppins font-medium hover:font-semibold rounded-sm px-4 py-2 w-fit h-full"
              onClick={() => {
                navigator.clipboard.writeText(shortenedUrl());
                setCopyButton("Copied!");
              }}
            >
              {copuButton()}
            </button>
          </div>
        </div>
      </Show>
      <Show when={error()}>
        <div class="w-full border-b-error border-b-2 h-12 bg-errorlight font-poppins text-xs sm:text-sm text-error flex items-center px-2">
          {error()}
        </div>
      </Show>
      <button
        class="bg-primary hover:bg-accent text-text font-poppins font-medium hover:font-semibold rounded-sm text-sm sm:text-base px-4 py-2 w-fit disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        onClick={shortenUrl}
        disabled={!shortenButtonEnabled()}
      >
        Shorten
      </button>
    </div>
  );
}

export default URLShortener;

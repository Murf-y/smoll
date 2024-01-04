import { Show, createSignal } from "solid-js";
import { LinksApi } from "../api/links";
import { useLocation } from "@solidjs/router";

function URLShortener() {
  const [url, setUrl] = createSignal("");
  const [error, setError] = createSignal("");
  const [shortenedUrl, setShortenedUrl] = createSignal("");
  const [copuButton, setCopyButton] = createSignal("Copy");

  const shortenUrl = async () => {
    try {
      const regex = new RegExp(
        "^(https?:\\/\\/)?" +
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
          "(\\?[;&a-z\\d%_.~+=-]*)?" +
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );

      if (!regex.test(url())) {
        throw new Error("Invalid URL, please enter a valid URL");
      }

      const res = await new LinksApi().create({
        longUrl: url(),
      });

      console.log(res);
      setError("");
      setShortenedUrl(window.location.origin + "/" + res.payload.shortUrl);
    } catch (e) {
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
      <Show when={shortenedUrl()}>
        <div class="w-full border-primary border-2 h-12 font-poppins text-sm text-primary flex items-center pl-2 pr-1 justify-between flex-row">
          {shortenedUrl()}
          <div class="flex flex-row gap-1 items-center justify-center">
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
              class="bg-primary hover:bg-accent text-text font-poppins font-medium hover:font-semibold rounded-sm px-4 py-2 w-fit"
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
        <div class="w-full border-b-error border-b-2 h-12 bg-errorlight font-poppins text-sm text-error flex items-center px-2">
          {error()}
        </div>
      </Show>
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

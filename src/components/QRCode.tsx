import { Show, createSignal } from "solid-js";
// @ts-ignore
import { QRCodeSVG } from "solid-qr-code";

function QRCode() {
  const [url, setUrl] = createSignal("");
  const [error, setError] = createSignal("");
  const [urlToBeGenerated, setUrlToBeGenerated] = createSignal("");
  const [shortenButtonEnabled, setShortenButtonEnabled] = createSignal(true);
  let qrRef: HTMLDivElement | undefined;

  const createQRCode = () => {
    if (!shortenButtonEnabled) return;

    setShortenButtonEnabled(false);
    setError("");
    try {
      const regex = new RegExp(
        "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})",
        "i"
      );
      console.log(regex.test(url()), url());
      if (!regex.test(url())) {
        throw new Error("Invalid URL, please enter a valid URL");
      }

      setUrlToBeGenerated(url());

      // wait 1 second before enabling the button again
      setTimeout(() => {
        setShortenButtonEnabled(true);
      }, 1000);
    } catch (e) {
      setShortenButtonEnabled(true);
      setUrlToBeGenerated("");
      if (e instanceof Error) {
        console.log(e.message);
        setError(e.message);
      } else {
        console.log(e);
        setError("Something went wrong, please try again later");
      }
    }
  };

  const downloadQRCode = () => {
    if (!qrRef) {
      setError("Something went wrong, please try again later");
      return;
    }

    const name = "qr-code.svg";

    qrRef.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = qrRef.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div class="py-8 px-14 w-full h-full flex flex-col justify-between items-end">
      <div class="flex flex-row justify-between items-start w-full">
        <div class="flex flex-col items-start gap-4 w-full">
          <div class="text-text font-medium text-lg font-poppins">
            Create a QR Code
          </div>
          <input
            type="text"
            class="w-3/4 bg-background border-2 border-text opacity-30 focus:border-accent focus:text-accent focus:opacity-100 rounded-sm px-4 py-2 text-text font-poppins"
            placeholder="Enter or Paste a URL here"
            value={url()}
            onInput={(e) => setUrl(e.currentTarget.value)}
          />
        </div>
        <Show when={urlToBeGenerated() !== ""}>
          <QRCodeSVG
            ref={qrRef}
            value={urlToBeGenerated()}
            size={240}
            bgColor={"#ffffff"}
            fgColor={"#242424"}
            level={"H"}
            includeMargin={false}
          />
        </Show>
      </div>
      <Show when={error()}>
        <div class="w-full border-b-error border-b-2 h-12 bg-errorlight font-poppins text-sm text-error flex items-center px-2">
          {error()}
        </div>
      </Show>
      <div class="text-text font-poppins font-medium hover:font-semibold w-fit flex flex-row gap-1">
        <Show when={urlToBeGenerated() !== ""}>
          <button
            class="bg-primary hover:bg-accent rounded-sm px-2 py-2 w-fit"
            onClick={downloadQRCode}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M14.0001 18.6666L8.16675 12.8333L9.80008 11.1416L12.8334 14.175V4.66663H15.1667V14.175L18.2001 11.1416L19.8334 12.8333L14.0001 18.6666ZM7.00008 23.3333C6.35841 23.3333 5.8093 23.105 5.35275 22.6485C4.89619 22.1919 4.66753 21.6424 4.66675 21V17.5H7.00008V21H21.0001V17.5H23.3334V21C23.3334 21.6416 23.1051 22.1911 22.6486 22.6485C22.192 23.1058 21.6425 23.3341 21.0001 23.3333H7.00008Z"
                fill="black"
              />
            </svg>
          </button>
        </Show>
        <button
          class="bg-primary hover:bg-accent rounded-sm px-4 py-2 w-fit disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          onClick={createQRCode}
          disabled={!shortenButtonEnabled()}
        >
          QR Code
        </button>
      </div>
    </div>
  );
}

export default QRCode;

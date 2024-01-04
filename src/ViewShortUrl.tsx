import { Show, createResource } from "solid-js";
import { Navigate, useParams } from "@solidjs/router";
import { LinksApi } from "./api/links";

async function fetchLongLink(shortUrlCode: string) {
  // Validate shortUrlCode,it is an 8 character string of alphanumeric characters

  const regex = new RegExp("^[a-zA-Z0-9]{8}$", "i");

  if (!regex.test(shortUrlCode)) {
    // Navigate to 404 page
    return window.location.origin + "/404";
  }

  try {
    const res = await new LinksApi().getLinkByShortUrl(shortUrlCode);
    const payload = res.payload;

    if (!payload) {
      // Navigate to 404 page
      return window.location.origin + "/404";
    }

    console.log(payload);
    return payload.longUrl;
  } catch (e) {
    console.log(e);
    // Navigate to 404 page
    return window.location.origin + "/404";
  }
}

const ViewShortUrl = () => {
  const params = useParams();
  const [data] = createResource(params.shortUrl, fetchLongLink);

  const redirect = () => {
    window.location.href = data() || "/";

    return <div></div>;
  };

  return (
    <Show
      when={data() !== undefined}
      fallback={
        <div class="w-full h-screen flex justify-center items-center text-2xl text-gradient text-text font-poppins">
          Redirecting...
        </div>
      }
    >
      {redirect()}
    </Show>
  );
};
export { ViewShortUrl };

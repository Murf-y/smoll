import { createResource, createSignal, Suspense } from "solid-js";
import { useParams } from "@solidjs/router";

async function fetchLongLink(shortUrlCode: string) {
  console.log("redirecting: ", shortUrlCode);
}

const ViewShortUrl = () => {
  const params = useParams();
  const [data] = createResource(params.shortUrl, fetchLongLink);

  return <div>Loading</div>;
};
export { ViewShortUrl };

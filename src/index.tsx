/* @refresh reload */
import "./index.css";
import App from "./App";
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { ViewShortUrl } from "./ViewShortUrl";
import { NotFound } from "./404";

const root = document.getElementById("root");

render(() => {
  return (
    <Router>
      <Route path="/" component={App} />
      <Route path="/:shortUrl" component={ViewShortUrl} />{" "}
      <Route path="*404" component={NotFound} />
    </Router>
  );
}, root!);

import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks";

hydrate(<RemixBrowser />, document);

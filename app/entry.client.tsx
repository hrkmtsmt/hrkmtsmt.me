import React, { startTransition, StrictMode} from "react";
import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  const root = document.querySelector("#app");
  
  if (!root) {
    return;
  }

  hydrateRoot(
    root,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});

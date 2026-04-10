
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  // Prevent the browser from restoring scroll position from a previous session,
  // which can cause the page to jump to #about if that hash was in the URL.
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  createRoot(document.getElementById("root")!).render(<App />);
  
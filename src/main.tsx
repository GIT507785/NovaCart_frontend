import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AppContextProvider from "./Context/AppContext";

createRoot(document.getElementById("root")!).render(
    <AppContextProvider>
        <App />
    </AppContextProvider>
);
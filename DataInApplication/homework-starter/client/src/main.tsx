// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import "./main.css";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Способ 1: Создаём QueryClient прямо здесь (самый простой)
const queryClient = new QueryClient();

// ИЛИ Способ 2: Импортируем из созданного файла (если хочешь)
// import { queryClient } from "./api/queryClient";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Обязательно обернуть App в QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
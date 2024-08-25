import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Search from "./Search";
import Leaderboard from "./Leaderboard";
import About from "./About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
  },
  {
    path: "/rankings",
    element: <Leaderboard />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <header className=" flex items-center gap-4 justify-between border-b border-gray-700">
      <a
        className="flex items-center gap-2 p-4 border-r border-gray-700"
        href="/"
      >
        <img src="/img/info-white.svg" className="w-6 h-6" />
        <p className="text-lg font-bold">raxx.haxx.nz</p>
      </a>
      <div className="flex items-center">
        <a
          href="/"
          className="text-blue-300 font-semibold border-l  py-4 px-8 border-gray-700"
        >
          Search
        </a>
        <a
          href="/rankings"
          className="text-blue-300 font-semibold border-l py-4 px-8 text-center  border-gray-700"
        >
          Leaderboard
        </a>
        <a
          href="/about"
          className="text-blue-300 font-semibold border-l  py-4 px-8 border-gray-700"
        >
          About
        </a>
      </div>
    </header>
    <RouterProvider router={router} />
  </React.StrictMode>
);

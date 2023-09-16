import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Home } from "./synonyms/synonyms";
import Addsynonyms from "./synonyms/addSynonyms";
import GetSynonyms from "./synonyms/getSynonyms";
import EditSynonyms from "./synonyms/editSynonyms";
import Header from "./Header";

function App() {
  let activeClassName = "underline underline-offset-1 px-1.5";
  return (
    <div>
      <Header />
      <div className="place-content-center bg-indigo-200 text-blue-900">
        <BrowserRouter>
          <nav className="text-center py-2">
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? activeClassName : "px-1.5"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="getsynonyms"
              className={({ isActive }) =>
                isActive ? activeClassName : "px-1.5"
              }
            >
              Get Synonyms
            </NavLink>
            <NavLink
              to="addsynonyms"
              className={({ isActive }) =>
                isActive ? activeClassName : "px-1.5"
              }
            >
              Add Synonyms
            </NavLink>
            <NavLink
              to="editSynonyms"
              className={({ isActive }) =>
                isActive ? activeClassName : "px-1.5"
              }
            >
              Edit Synonyms
            </NavLink>
          </nav>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="getsynonyms" element={<GetSynonyms />} />
            <Route path="addsynonyms" element={<Addsynonyms />} />
            <Route path="editSynonyms" element={<EditSynonyms />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

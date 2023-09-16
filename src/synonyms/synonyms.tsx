import React from "react";

export const Home = () => {
  return (
    <div className="grid p-6 place-content-center bg-indigo-100 text-black">
      <h1 className="text-xl mb-3">Search, Add, and Update Synonyms</h1>
      <ul className="list-disc list-inside">
        <li>
          The user can add new word with synonyms, update synonyms for a word,
          and search all synonyms for a word
        </li>
        <li>
          The user will ask for synonyms for a word and lookup should work in
          both directions. For example, If "family" is a synonym to "home", then
          I should be able to look up both words and get the respective
          synonyms.
        </li>
        <li>
          A word may have multiple synonyms and all should be returned at a user
          request.
        </li>
        <li>
          Transitive rule implementation, i.e. if "B" is a synonym to "A" and
          "C" a synonym to "B", then "C" should automatically, by transitive
          rule, also be the synonym for "A".
        </li>
      </ul>
    </div>
  );
};

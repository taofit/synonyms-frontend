import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const EditSynonyms = () => {
  const [baseWord, setBaseWord] = useState("");
  const [synonymsList, setSynonymsList] = useState<string[]>([]);

  const addSynonyms = () => {
    setSynonymsList([...synonymsList, ""]);
  };

  const removeSynonyms = (index: number) => {
    const rows = [...synonymsList];
    rows.splice(index, 1);
    setSynonymsList(rows);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: word } = event.target;
    setBaseWord(word);
    if (word === "") {
      setSynonymsList([]);
    }
  };

  const handleSynonymsChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const list = [...synonymsList];
    list[index] = value;
    setSynonymsList(list);
  };

  const handleSearchSubmit = async () => {
    if (baseWord.trim() === "") {
      toast.error("No synonyms added");
      return;
    }

    const rawResponse = await fetch(
      `http://localhost:5001/api/synonyms?search=${baseWord}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!rawResponse.ok) {
      toast.error("error sent the synonyms to the backend");
      return;
    }

    let oriSynonymsList = await rawResponse.json();
    if (oriSynonymsList.length === 0 || oriSynonymsList.length === 1) {
      toast((t) => "There is no synonyms for " + baseWord);
    }
    oriSynonymsList = oriSynonymsList.filter(
      (synonyms: string) => synonyms !== baseWord
    );
    setSynonymsList(oriSynonymsList);
  };

  const handleSaveSubmit = async () => {
    if (synonymsList.length === 0) {
      toast.error("No synonyms added");
      return;
    }
    const hasEmptyWord = synonymsList.some(
      (synonyms): boolean => synonyms.trim() === ""
    );
    if (hasEmptyWord) {
      toast.error("Synonyms has empty value");
      return;
    }
    const rawResponse = await fetch("http://localhost:5001/api/synonyms", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word: baseWord, synonymsList: synonymsList.map((w) => w.trim()) }),
    });
    const { msg } = await rawResponse.json();
    if (!rawResponse.ok) {
      toast.error("Error: " + msg);
      return;
    }
    toast.success(msg);
  };

  return (
    <div className="grid pb-6 place-content-center bg-indigo-100 text-black">
      <div>
        <div className="py-2">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for a synonyms..."
              type="text"
              name="synonyms search"
              value={baseWord}
              onChange={(event) => handleSearchChange(event)}
            />
          </label>
        </div>
        <div>
          Synonyms for
          <span className="pl-1 uppercase underline underline-offset-1">
            {baseWord}
          </span>
        </div>
        <div className="grid gap-4 grid-cols-3 grid-rows-3">
          {synonymsList.map((synonyms, index) => (
            <div
              className="p-2 my-2 text-center border-solid border-black border rounded block bg-indigo-200 text-blue-900"
              key={index}
            >
              <input
                type="text"
                className="from-orange-50 pb-px mx-1.5"
                name="synonyms"
                onChange={(event) => handleSynonymsChange(index, event)}
                value={synonyms}
              />
              {synonymsList.length !== 1 ? (
                <button
                  className="hover:rounded-lg text-red-600 px-2"
                  onClick={() => removeSynonyms(index)}
                >
                  x
                </button>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
        <button
          className="inline-block border-solid border-black border rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={addSynonyms}
        >
          Add New
        </button>
        <button
          className="mx-3 inline-block border-solid border-black border rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={handleSearchSubmit}
        >
          Search
        </button>
        <button
          className="inline-block border-solid border-black border rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={handleSaveSubmit}
        >
          Save
        </button>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default EditSynonyms;

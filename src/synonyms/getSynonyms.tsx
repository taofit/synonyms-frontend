import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const GetSynonyms = () => {
  const [baseSynonyms, setBaseSynonyms] = useState("");
  const [synonymsList, setSynonymsList] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setBaseSynonyms(value);
    if (value === "") {
      setSynonymsList([]);
    }
  };

  const handleSubmit = async () => {
    if (baseSynonyms.trim() === "") {
      toast.error("No synonyms added");
      return;
    }

    const rawResponse = await fetch(
      `http://localhost:5001/api/synonyms?search=${baseSynonyms}`,
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
      toast((t) => "There is no synonyms for " + baseSynonyms);
    }
    oriSynonymsList = oriSynonymsList.filter(
      (synonyms: string) => synonyms !== baseSynonyms
    );
    setSynonymsList(oriSynonymsList);
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
              value={baseSynonyms}
              onChange={(event) => handleChange(event)}
            />
          </label>
        </div>
        <div>
          Synonyms for
          <span className="pl-1 uppercase underline underline-offset-1">
            {baseSynonyms}
          </span>
        </div>
        <div className="grid gap-4 grid-cols-3 grid-rows-3">
          {synonymsList.map((synonyms, index) => (
            <div
              className="p-2 my-2 text-center border-solid border-black border rounded block bg-indigo-200 text-blue-900"
              key={index}
            >
              {synonyms}
            </div>
          ))}
        </div>
        <button
          className="w-1/2 inline-block border-solid border-black border rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={handleSubmit}
        >
          search
        </button>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default GetSynonyms;

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchedAnimeName = searchParams.get("name");

  const [params, setParams] = useState(searchedAnimeName || "");

  useEffect(() => {
    if (!searchedAnimeName) {
      setParams("");
    }
  }, [searchedAnimeName]);

  const handleSubmit = () => {
    if (params) {
      router.push(`/search?name=${params}`);
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Search for anime"
        className="input rounded-none bg-base-200 w-full outline-none focus:border-opacity-100 focus:border-slate-950 focus:outline-none text-sm"
        value={params}
        onChange={(e) => setParams(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button onClick={handleSubmit} className={`btn btn-primary rounded-none`}>
        Search
      </button>
    </div>
  );
};

export default Search;

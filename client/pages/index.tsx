import React, { useEffect, useState } from "react";

export default function Index() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState<any>(null);

  const handleQuery = () => {
    fetch(`http://127.0.0.1:8080/api/home?query=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        if ("results" in data) {
          setResults(data.results);
          setError(null);
        } else if ("error" in data) {
          setResults([]);
          setError(data.error);
        }
      })
      .catch((error) => {
        setResults([]);
        setError("Error fetching data");
      });
  };

  return (
    <div className="my-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleQuery();
        }}
      >
        <label>
          Query:
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {error && <div>Error: {error}</div>}

      <div>
        {results.map((result : any) => (
          <div key={result.id}>
            <h3>{result.title}</h3>
            <p>{result.url}</p>
            <img src={result.thumbnail} alt="Thumbnail" />
            <p>Score: {result.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

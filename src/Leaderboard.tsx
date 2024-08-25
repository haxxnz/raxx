import React, { useEffect, useState } from "react";
import CrimeGroupsList from "./components/CrimeGroupsList";

interface CrimeData {
  [key: string]: unknown; // Replace with a more specific type if possible
}

function Leaderboard() {
  const [crimeData, setCrimeData] = useState<CrimeData | null>(null);
  const [crimeNames, setCrimeNames] = useState<string[]>([]);
  const [selectedCrime, setSelectedCrime] = useState("all");
  const [timeFilter, setTimeFilter] = useState("year");

  async function getLeadData() {
    const url =
      "https://raw.githubusercontent.com/haxxnz/raxx-data/main/crime_by_year_20240825.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch crime data:", error);
      return null;
    }
  }

  useEffect(() => {
    getLeadData().then((data) => {
      if (data) {
        setCrimeData(data);
        setCrimeNames(Object.keys(data));
      }
    });
  }, []);

  return (
    <>
      <section className="max-lg:m-4 max-w-6xl mx-auto mt-8 border-gray-700 border rounded-xl p-6 bg-gray-950">
        <h1 className="text-2xl font-semibold border-b border-gray-700 pb-6">
          Crime Leaderboards
        </h1>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              Select category
            </label>
            <select
              id="category"
              value={selectedCrime}
              onChange={(e) => setSelectedCrime(e.target.value)}
              className="p-2 rounded-md mt-2 w-full text-white"
            >
              <option value="all">All Crime</option>
              {crimeNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium">
              Filter by time
            </label>
            <select
              id="time"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="p-2 rounded-md mt-2 w-full text-white"
            >
              <option value="year">This year</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </section>
      <section className="max-lg:m-4 max-w-6xl mx-auto mt-8">
        <h1 className="text-2xl font-semibold">
          {selectedCrime === "all" ? "All Incidents" : selectedCrime} /{" "}
          {timeFilter === "year" ? "This year" : "This month"}
        </h1>
      </section>
      <section className="max-lg:m-4 max-w-6xl mx-auto mt-8 border-gray-700 border rounded-xl p-6 bg-gray-950">
        <div className="flex justify-between font-semibold mb-8">
          <p className="flex-1 text-lg">Location</p>
          <p className="flex-1 text-lg text-end">Frequency</p>
        </div>

        {crimeData && (
          <CrimeGroupsList crimeData={crimeData[selectedCrime] || crimeData} />
        )}
      </section>
    </>
  );
}

export default Leaderboard;

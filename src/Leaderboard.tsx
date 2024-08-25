import { useState } from "react";
import "./App.css";

const oneYearAgo = new Date(
  new Date().setFullYear(new Date().getFullYear() - 1)
);

function Leaderboard() {
  const [startDate, setStartDate] = useState(
    oneYearAgo.toISOString().split("T")[0]
  );
  return (
    <>
      <section className="w-full max-w-6xl mx-auto mt-8 border-gray-700 border rounded-xl p-6 bg-gray-950">
        <h1 className="text-2xl font-semibold border-b border-gray-700 pb-6">
          Crime Leaderboards
        </h1>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Select category
            </label>
            <select
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              name="location"
              className="p-2 rounded-md mt-2 w-full text-white"
              placeholder="Last year"
            >
              <option value="all">All Crime</option>
              <option value="year">Theft</option>
              <option value="month">Assault</option>
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Filter by time
            </label>
            <select
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              name="location"
              className="p-2 rounded-md mt-2 w-full text-white"
              placeholder="Last year"
            >
              <option value="year">This year</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        <button className="w-full p-4 bg-blue-600 mt-6 rounded-xl max-w-56">
          Submit
        </button>
      </section>{" "}
      <section className="w-full max-w-6xl mx-auto mt-8">
        {" "}
        <h1 className="text-2xl font-semibold">All Incidents / This year</h1>
      </section>
      <section className="w-full max-w-6xl mx-auto mt-8 border-gray-700 border rounded-xl p-6 bg-gray-950">
        {" "}
        <div className="flex justify-between font-semibold mb-8">
          <p className="flex-1 text-lg">Location</p>
          <p className="flex-1 text-lg text-end">Frequency</p>
        </div>
        <div className="flex justify-between items-center min-h-24 border-t border-gray-700">
          <p className="flex-1 text-lg">1. Britomart, Auckland</p>
          <p className="flex-1 text-lg text-end">1,230,123 Incidents</p>
        </div>
      </section>
      <section className="w-full max-w-6xl mx-auto mt-8"></section>
    </>
  );
}

export default Leaderboard;

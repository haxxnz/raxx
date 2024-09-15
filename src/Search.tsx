import React, { useEffect, useState } from "react";
import "./App.css";

const thisYear = new Date().getFullYear();
const oneYearAgo = new Date(
  new Date().setFullYear(thisYear - 1)
);

function calculateCrimeChange(totalCrimes: Map<number, number>, year: number) {
  let thisYear = totalCrimes.get(year);
  let lastYear = totalCrimes.get(year - 1);

  if (!thisYear || !lastYear) {
    return "Unknown";
  }

  let change = (thisYear - lastYear) / lastYear;
  let display = Math.round(change * 1000) / 10;
  return `${display}%`;
}

async function getData(): Promise<Record<string, Record<string, number>>> {
  const url =
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/results_20240825.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

function Search() {
  const ALL_NEW_ZEALAND = "All of New Zealand";
  interface Region {
    locationName: string,
    // year -> total crime count
    totalCrimeByYear: Map<number, number>,
    // crime -> [year -> count]
    crimeByYear: Map<string, Map<number, number>>
  }

  const [startDate, setStartDate] = useState(
    oneYearAgo.toISOString().split("T")[0]
  );
  const [regionSelected, setRegionSelected] = useState<Region>();
  const [regionList, setRegionList] = useState<string[]>();
  const [regionData, setRegionData] = useState<Map<string, Region>>();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      let regionList: string[] = [];
      let regionData: Map<string, Region> = new Map();
      let allNzCrime: Region = {
        locationName: ALL_NEW_ZEALAND,
        totalCrimeByYear: new Map(),
        crimeByYear: new Map()
      };
      Object.entries(fetchedData).map(([location, crimeData]) => {
        regionList.push(location);
        let regionTotalCrimes = new Map();
        let regionCrimeByYear = new Map();
        for (let [monthYear, crimeDict] of Object.entries(crimeData)) {
          let [monthString, yearString] = monthYear.split(' ');
          let year = parseInt(yearString);

          let nzTotalCrimeYear = allNzCrime.totalCrimeByYear.get(year) ?? 0;
          let regionTotalCrime = regionTotalCrimes.get(year) ?? 0;
          for (let [crime, crimeCount] of Object.entries(crimeDict)) {
            // set national crime
            nzTotalCrimeYear += crimeCount;
            let nzCrimeCategory = allNzCrime.crimeByYear.get(crime) ?? new Map();
            let nzCrimeForYear = nzCrimeCategory.get(year) ?? 0;

            nzCrimeForYear += crimeCount;

            nzCrimeCategory.set(year, nzCrimeForYear);
            regionCrimeByYear.set(crime, nzCrimeCategory);
            allNzCrime.crimeByYear.set(crime, nzCrimeCategory);

            // set regional crime
            regionTotalCrime += crimeCount;
            let regionCrimeYear = regionCrimeByYear.get(crime) ?? new Map();
            let regionCrime = regionCrimeYear.get(year) ?? 0;

            regionCrime += crimeCount;
            regionCrimeYear.set(year, regionCrime);
            regionCrimeByYear.set(crime, regionCrimeYear);
          }
          allNzCrime.totalCrimeByYear.set(year, nzTotalCrimeYear);
          regionTotalCrimes.set(year, regionTotalCrime);
        }
        regionData.set(location, {
          locationName: location,
          totalCrimeByYear: regionTotalCrimes,
          crimeByYear: regionCrimeByYear
        });
      });
      regionData.set(ALL_NEW_ZEALAND, allNzCrime);
      setRegionList(regionList);
      setRegionData(regionData);
      setRegionSelected(allNzCrime);
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="max-w-6xl mx-auto mt-8 border-gray-700 border rounded-xl p-6 bg-gray-950 max-xl:m-4">
        <h1 className="text-2xl font-semibold border-b border-gray-700 pb-6">
          Search Suburbs for Crime stats
        </h1>

        <div className="mt-6 grid grid-cols-3 gap-4 max-lg:grid-cols-1">
          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
          </div>

          <div>
            <label
              htmlFor="dateComparison"
              className="block text-sm font-medium"
            >
              Compared to when?
            </label>
            <select
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              name="dateComparison"
              id="dateComparison"
              className="p-2 rounded-md mt-2 w-full text-white"
            >
              <option value="year">Last Year</option>
              <option value="month">Last Month</option>
            </select>
          </div>
        </div>
      </section>

      {/* ... (rest of the JSX remains the same) ... */}

      <section className="mb-24">
      {}
      </section>
    </>
  );
}

export default Search;

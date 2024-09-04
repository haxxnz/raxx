import { useEffect, useState } from "react";
import CrimeSummary from "./components/CrimeSummary";
import { CrimeData } from "./types";

const totalUrls = {
  "2024":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboards/2024.json",
  "2023":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboards/2023.json",
  "2022":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboards/2022.json",
  "2021":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboards/2021.json",
  "2020":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboards/2020.json",
};

const divisionUrls = {
  "Abduction harassment and other related offences against a person":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_divisions/abduction_harassment_and_other_related_offences_against_a_person.json",
  "Acts intended to cause injury":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_divisions/acts_intended_to_cause_injury.json",
  "Robbery extortion and related offences":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_divisions/robbery_extortion_and_related_offences.json",
  "Sexual assault and related offences":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_divisions/sexual_assault_and_related_offences.json",
  "Theft and related offences":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_divisions/theft_and_related_offences.json",
  "Unlawful entry with intentburglary break and enter":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_divisions/unlawful_entry_with_intentburglary_break_and_enter.json",
};

const subdivisionUrls = {
  "Abduction and kidnapping":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/abduction_and_kidnapping.json",
  "Aggravated robbery":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/aggravated_robbery.json",
  "Aggravated sexual assault":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/aggravated_sexual_assault.json",
  "Blackmail and extortion":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/blackmail_and_extortion.json",
  "Common assault":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/common_assault.json",
  "Illegal use of a motor vehicle":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/illegal_use_of_a_motor_vehicle.json",
  "Illegal use of property except motor vehicles":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/illegal_use_of_property_except_motor_vehicles.json",
  "Nonaggravated robbery":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/nonaggravated_robbery.json",
  "Nonaggravated sexual assault":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/nonaggravated_sexual_assault.json",
  "Serious assault not resulting in injury":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/serious_assault_not_resulting_in_injury.json",
  "Serious assault resulting in injury":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/serious_assault_resulting_in_injury.json",
  "Theft except motor vehicles nec":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/theft_except_motor_vehicles_nec.json",
  "Theft from a person excluding by force":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/theft_from_a_person_excluding_by_force.json",
  "Theft from retail premises":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/theft_from_retail_premises.json",
  "Theft of a motor vehicle":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/theft_of_a_motor_vehicle.json",
  "Theft of motor vehicle parts or contents":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/theft_of_motor_vehicle_parts_or_contents.json",
  "Unlawful entry with intentburglary break and enter":
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/data/leaderboard_2024_subdivisions/unlawful_entry_with_intentburglary_break_and_enter.json",
};

const urls = {
  Total: "placeholder", // this is a lazy hack
  ...divisionUrls,
  ...subdivisionUrls,
};

type UrlsMap = typeof urls;

const getUrl = (selectedCrime: keyof UrlsMap, filterTime: string) => {
  if (selectedCrime === "Total") {
    return totalUrls[filterTime as keyof typeof totalUrls];
  }
  return urls[selectedCrime];
};

const getLeadData = async (
  selectedCrime: keyof UrlsMap,
  filterTime: string
) => {
  const url = getUrl(selectedCrime, filterTime);
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
};

function Leaderboard() {
  const [crimeData, setCrimeData] = useState<CrimeData | null>(null);
  const [selectedCrime, setSelectedCrime] = useState<keyof UrlsMap>("Total");
  const [timeFilter, setTimeFilter] = useState("2024");

  useEffect(() => {
    getLeadData(selectedCrime, timeFilter).then((data) => {
      if (data) {
        setCrimeData(data);
      }
    });
  }, [selectedCrime, timeFilter]);

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
              onChange={(e) => {
                setSelectedCrime(e.target.value as keyof UrlsMap);
                if (e.target.value !== "Total") {
                  setTimeFilter("2024");
                }
              }}
              className="p-2 rounded-md mt-2 w-full text-white"
            >
              {" "}
              <optgroup label="Totals">
                <option value={"Total"}>All Crime in New Zealand</option>
              </optgroup>
              <optgroup label="Divisions">
                {Object.keys(divisionUrls).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Subdivisions">
                {Object.keys(subdivisionUrls).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium">
              Filter by time
            </label>
            <select
              id="time"
              value={timeFilter}
              disabled={selectedCrime !== "Total"}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="p-2 rounded-md mt-2 w-full text-white"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
      </section>
      <section className="max-lg:m-4 max-w-6xl mx-auto mt-8">
        <h1 className="text-2xl font-semibold">
          {selectedCrime}{" "}
          {timeFilter === new Date().getFullYear().toString()
            ? "this year"
            : "for " + timeFilter}
        </h1>
      </section>
      <section className="max-lg:m-4 max-w-6xl mx-auto mt-8 border-gray-700 border rounded-xl p-6 bg-gray-950">
        {crimeData && <CrimeSummary crimeData={crimeData} />}
      </section>
    </>
  );
}

export default Leaderboard;

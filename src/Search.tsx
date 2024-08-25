import { useEffect, useState } from "react";
import "./App.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const oneYearAgo = new Date(
  new Date().setFullYear(new Date().getFullYear() - 1)
);

async function getData() {
  const url =
    "https://raw.githubusercontent.com/haxxnz/raxx-data/main/results_20240825.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

// Define the fetchData function
const fetchData = async () => {
  // Your logic to fetch data
  const data = await getData();
  const dataWithID = data.map((item, index) => ({
    ...item,
    id: index + 1,
  }));
  return dataWithID;
  // Do something with dataWithID
};

function Search() {
  const [startDate, setStartDate] = useState(
    oneYearAgo.toISOString().split("T")[0]
  );

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {item.name}
        </span>
      </>
    );
  };

  return (
    <>
      <section className=" max-w-6xl mx-auto mt-8 border-gray-700 border rounded-xl p-6 bg-gray-950 max-xl:m-4">
        <h1 className="text-2xl font-semibold border-b border-gray-700 pb-6">
          Search Suburbs for Crime stats{" "}
        </h1>

        <div className="mt-6 grid grid-cols-3 gap-4 max-lg:grid-cols-1">
          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <ReactSearchAutocomplete
              items={fetchData} // Call the getData function to get the array of items
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Compared to when?
            </label>
            <select
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              name="location"
              className="p-2 rounded-md mt-2 w-full text-white"
            >
              <option value="year">Last Year</option>
              <option value="month">Last Month</option>
            </select>
          </div>
        </div>
      </section>{" "}
      <section className=" max-w-6xl mx-auto mt-8 max-xl:m-4">
        <h1 className="text-2xl  border-b border-gray-800 mb-8 pb-6">
          Crime stats for all of <strong>New Zealand</strong>
          <span className="font-normal text-gray-600"> - This Year</span>
        </h1>
        <div className="">
          <div className="border-gray-900 border rounded-xl block my-4 bg-gray-950">
            <aside className="text-xl text-white border-b border-gray-900  p-4 font-semibold">
              Total Reported Incidents
            </aside>
            <div className="flex gap-4 items-center p-4">
              <img src="/img/up.svg" className="w-8 h-8 bg-gray rounded-xl" />
              <div>
                <h3>
                  <span className="text-base font-semibold ">Up 15%</span>{" "}
                  <span className="text-base text-gray-300">
                    from last year
                  </span>
                </h3>
                <p className="text-sm text-gray-600">
                  1230 incidents this year vs 1220 last year
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center border-t border-gray-900  p-4 w-full "></div>
          </div>
          <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
            <a
              href="theft"
              className="border-gray-900 border rounded-xl bg-gray-950"
            >
              <aside className="text-xl text-blue-400 border-b border-gray-900  p-4 font-semibold">
                Theft
              </aside>
              <div className="flex gap-4 items-center p-4">
                <img src="/img/up.svg" className="w-8 h-8 bg-gray rounded-xl" />
                <div>
                  <h3>
                    <span className="text-base font-semibold ">Up 15%</span>{" "}
                    <span className="text-base text-gray-300">
                      from last year
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    1230 incidents this year vs 1220 last year
                  </p>
                </div>
              </div>
            </a>
            <a
              href="theft"
              className="border-gray-900 border rounded-xl bg-gray-950"
            >
              <aside className="text-xl text-blue-400 border-b border-gray-900  p-4 font-semibold">
                Violent Crime
              </aside>
              <div className="flex gap-4 items-center p-4">
                <img src="/img/up.svg" className="w-8 h-8 bg-gray rounded-xl" />
                <div>
                  <h3>
                    <span className="text-base font-semibold ">Up 15%</span>{" "}
                    <span className="text-base text-gray-300">
                      from last year
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    1230 incidents this year vs 1220 last year
                  </p>
                </div>
              </div>
            </a>
            <a
              href="theft"
              className="border-gray-900 border rounded-xl bg-gray-950"
            >
              <aside className="text-xl text-blue-400 border-b border-gray-900  p-4 font-semibold">
                Sexual Assault
              </aside>
              <div className="flex gap-4 items-center p-4">
                <img src="/img/up.svg" className="w-8 h-8 bg-gray rounded-xl" />
                <div>
                  <h3>
                    <span className="text-base font-semibold ">Up 15%</span>{" "}
                    <span className="text-base text-gray-300</div>">
                      from last year
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    1230 incidents this year vs 1220 last year
                  </p>
                </div>
              </div>
            </a>
            <a
              href="theft"
              className="border-gray-900 border rounded-xl bg-gray-950"
            >
              <aside className="text-xl text-blue-400 border-b border-gray-900  p-4 font-semibold">
                Kidnapping &amp; Harassment
              </aside>
              <div className="flex gap-4 items-center p-4">
                <img src="/img/up.svg" className="w-8 h-8 bg-gray rounded-xl" />
                <div>
                  <h3>
                    <span className="text-base font-semibold ">Up 15%</span>{" "}
                    <span className="text-base text-gray-300">
                      from last year
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    1230 incidents this year vs 1220 last year
                  </p>
                </div>
              </div>
            </a>
            <a
              href="theft"
              className="border-gray-900 border rounded-xl bg-gray-950"
            >
              <aside className="text-xl text-blue-400 border-b border-gray-900  p-4 font-semibold">
                Assault
              </aside>
              <div className="flex gap-4 items-center p-4">
                <img src="/img/up.svg" className="w-8 h-8 bg-gray rounded-xl" />
                <div>
                  <h3>
                    <span className="text-base font-semibold ">Up 15%</span>{" "}
                    <span className="text-base text-gray-300">
                      from last year
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    1230 incidents this year vs 1220 last year
                  </p>
                </div>
              </div>
            </a>
            <a
              href="theft"
              className="border-gray-900 border rounded-xl bg-gray-950"
            >
              <aside className="text-xl text-blue-400 border-b border-gray-900  p-4 font-semibold">
                Theft
              </aside>
              <div className="flex gap-4 items-center p-4">
                <img src="/img/up.svg" className="w-8 h-8 bg-gray rounded-xl" />
                <div>
                  <h3>
                    <span className="text-base font-semibold ">Up 15%</span>{" "}
                    <span className="text-base text-gray-300">
                      from last year
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    1230 incidents this year vs 1220 last year
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section className="max-lg:m-4 max-w-6xl mx-auto mt-8 border-gray-800 border rounded-xl bg-gray-950">
        <h2 className="text-3xl font-semibold p-4 border-b border-gray-800">
          Theft
        </h2>
        <div className="grid grid-cols-3 gap-4 p-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          <div>
            <aside className="text-sm">Illegal Use of a Motor Vehicle</aside>
            <h3 className="text-3xl font-semibold">
              123 <span className="text-sm text-gray-400">Incidents</span>
            </h3>
            <p className="text-sm mt-4">Up 50% from !SELECTEDPERIOD!</p>
          </div>
          <div>
            <aside className="text-sm">
              Illegal Use of Property (Except Motor Vehicles)
            </aside>
            <h3 className="text-3xl font-semibold">
              123 <span className="text-sm text-gray-400">Incidents</span>
            </h3>
            <p className="text-sm mt-4">Up 50% from !SELECTEDPERIOD!</p>
          </div>
          <div>
            <aside className="text-sm">
              Theft (Except Motor Vehicles), N.E.C.
            </aside>
            <h3 className="text-3xl font-semibold">
              123 <span className="text-sm text-gray-400">Incidents</span>
            </h3>
            <p className="text-sm mt-4">Up 50% from !SELECTEDPERIOD!</p>
          </div>
          <div>
            <aside className="text-sm">
              Theft From a Person (Excluding By Force)
            </aside>
            <h3 className="text-3xl font-semibold">
              123 <span className="text-sm text-gray-400">Incidents</span>
            </h3>
            <p className="text-sm mt-4">Up 50% from !SELECTEDPERIOD!</p>
          </div>
          <div>
            <aside className="text-sm">Theft from retail premises</aside>
            <h3 className="text-3xl font-semibold">
              123 <span className="text-sm text-gray-400">Incidents</span>
            </h3>
            <p className="text-sm mt-4">Up 50% from !SELECTEDPERIOD!</p>
          </div>
          <div>
            <aside className="text-sm">Theft of a motor vehicle</aside>
            <h3 className="text-3xl font-semibold">
              123 <span className="text-sm text-gray-400">Incidents</span>
            </h3>
            <p className="text-sm mt-4">Up 50% from !SELECTEDPERIOD!</p>
          </div>
          <div>
            <aside className="text-sm">
              Theft of Motor Vehicle Parts or Contents
            </aside>
            <h3 className="text-3xl font-semibold">
              123 <span className="text-sm text-gray-400">Incidents</span>
            </h3>
            <p className="text-sm mt-4">Up 50% from !SELECTEDPERIOD!</p>
          </div>
        </div>
      </section>
      <section className="mb-24"></section>
    </>
  );
}

export default Search;

// import React, { useEffect, useState } from "react";
// import "./App.css";

// const oneYearAgo = new Date(
//   new Date().setFullYear(new Date().getFullYear() - 1)
// );

// async function getData() {
//   const url =
//     "https://raw.githubusercontent.com/haxxnz/raxx-data/main/results_20240825.json";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     console.log(json);
//     return json;
//   } catch (error) {
//     console.error(error.message);
//     return [];
//   }
// }

// function Search() {
//   const [startDate, setStartDate] = useState(
//     oneYearAgo.toISOString().split("T")[0]
//   );
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const fetchedData = await getData();
//       const dataWithID = fetchedData.map((item, index) => ({
//         ...item,
//         id: index + 1,
//       }));
//       setData(dataWithID);
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <section className="max-w-6xl mx-auto mt-8 border-gray-700 border rounded-xl p-6 bg-gray-950 max-xl:m-4">
//         <h1 className="text-2xl font-semibold border-b border-gray-700 pb-6">
//           Search Suburbs for Crime stats
//         </h1>

//         <div className="mt-6 grid grid-cols-3 gap-4 max-lg:grid-cols-1">
//           <div>
//             <label htmlFor="location" className="block text-sm font-medium">
//               Location
//             </label>
//           </div>

//           <div>
//             <label
//               htmlFor="dateComparison"
//               className="block text-sm font-medium"
//             >
//               Compared to when?
//             </label>
//             <select
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               name="dateComparison"
//               id="dateComparison"
//               className="p-2 rounded-md mt-2 w-full text-white"
//             >
//               <option value="year">Last Year</option>
//               <option value="month">Last Month</option>
//             </select>
//           </div>
//         </div>
//       </section>

//       {/* ... (rest of the JSX remains the same) ... */}

//       <section className="mb-24">
//         {data.map((item) => (
//           <div
//             key={item.id}
//             className="border-gray-900 border rounded-xl bg-gray-950"
//           >
//             <aside className="text-xl text-blue-400 border-b border-gray-900 p-4 font-semibold">
//               {item.title}
//             </aside>
//             <div className="flex gap-4 items-center p-4">
//               <img
//                 src={item.image}
//                 alt=""
//                 className="w-8 h-8 bg-gray rounded-xl"
//               />
//               <div>
//                 <h3>
//                   <span className="text-base font-semibold">
//                     {item.percentage}
//                   </span>{" "}
//                   <span className="text-base text-gray-300">
//                     from last year
//                   </span>
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   {item.incidentsThisYear} incidents this year vs{" "}
//                   {item.incidentsLastYear} last year
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>
//     </>
//   );
// }

// export default Search;

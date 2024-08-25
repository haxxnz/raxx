import React from "react";

const CrimeGroupsList = ({ crimeData }) => {
  // Function to group data by year for each location
  const groupByLocationAndYear = (data) => {
    const groupedData = {};
    Object.entries(data).forEach(([location, monthlyData]) => {
      groupedData[location] = {};
      Object.entries(monthlyData).forEach(([month, crimes]) => {
        const year = month.split(" ")[1];
        if (!groupedData[location][year]) {
          groupedData[location][year] = {};
        }
        Object.entries(crimes).forEach(([crimeType, count]) => {
          if (!groupedData[location][year][crimeType]) {
            groupedData[location][year][crimeType] = 0;
          }
          groupedData[location][year][crimeType] += count;
        });
      });
    });
    return groupedData;
  };

  // Group the data by location and year
  const groupedData = groupByLocationAndYear(crimeData);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Crime Groups by Location and Year
      </h2>
      {Object.entries(groupedData).map(([location, yearlyData]) => (
        <div key={location} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{location}</h3>
          {Object.entries(yearlyData).map(([year, crimes]) => (
            <div key={year} className="ml-4 mb-4">
              <h4 className="text-lg font-medium mb-2">{year}</h4>
              <ul className="list-disc pl-5">
                {Object.entries(crimes).map(([crimeType, count]) => (
                  <li key={crimeType} className="mb-1">
                    {crimeType}: {count}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CrimeGroupsList;

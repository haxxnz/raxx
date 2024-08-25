import React, { useMemo } from "react";

const CrimeGroupsList = ({ crimeData }) => {
  const currentYear = new Date().getFullYear().toString();

  const groupAndSortData = useMemo(() => {
    const groupedData = {};

    // Group data by crime type, location, and year
    Object.entries(crimeData).forEach(([crimeType, locations]) => {
      groupedData[crimeType] = {};
      Object.entries(locations).forEach(([location, yearData]) => {
        if (!groupedData[crimeType][location]) {
          groupedData[crimeType][location] = {};
        }
        Object.entries(yearData).forEach(([year, count]) => {
          if (!groupedData[crimeType][location][year]) {
            groupedData[crimeType][location][year] = 0;
          }
          groupedData[crimeType][location][year] += count;
        });
      });
    });

    // Calculate total crimes for current year and sort crime types
    const sortedCrimeTypes = Object.entries(groupedData)
      .map(([crimeType, locationData]) => {
        const currentYearTotal = Object.values(locationData).reduce(
          (sum, yearData) => sum + (yearData[currentYear] || 0),
          0
        );
        return { crimeType, locationData, currentYearTotal };
      })
      .sort((a, b) => b.currentYearTotal - a.currentYearTotal);

    return sortedCrimeTypes;
  }, [crimeData, currentYear]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Crime Groups by Type, Location, and Year
      </h2>
      {groupAndSortData.map(({ crimeType, locationData, currentYearTotal }) => (
        <div key={crimeType} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">
            {crimeType} (Current Year Total: {currentYearTotal})
          </h3>
          {Object.entries(locationData).map(([location, yearData]) => (
            <div key={location} className="ml-4 mb-4">
              <h4 className="text-lg font-medium mb-2">{location}</h4>
              <ul className="list-disc pl-5">
                {Object.entries(yearData)
                  .sort((a, b) => b[0].localeCompare(a[0]))
                  .map(([year, count]) => (
                    <li key={year} className="mb-1">
                      {year}: {count}
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

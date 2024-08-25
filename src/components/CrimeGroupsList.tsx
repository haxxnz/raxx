import React, { useMemo } from "react";

const CrimeGroupsList = ({ crimeData }) => {
  const currentYear = new Date().getFullYear().toString();

  const groupAndSortData = useMemo(() => {
    const groupedData = {};

    // Group data by location and year
    Object.entries(crimeData).forEach(([location, monthlyData]) => {
      groupedData[location] = {};
      Object.entries(monthlyData).forEach(([monthYear, crimes]) => {
        const [, year] = monthYear.split(" ");
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

    // Calculate total crimes for current year and sort locations
    const sortedLocations = Object.entries(groupedData)
      .map(([location, yearData]) => {
        const currentYearTotal = Object.values(
          yearData[currentYear] || {}
        ).reduce((sum, count) => sum + count, 0);
        return { location, currentYearTotal, yearData };
      })
      .sort((a, b) => b.currentYearTotal - a.currentYearTotal);

    return sortedLocations;
  }, [crimeData, currentYear]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Crime Groups by Location and Year
      </h2>
      {groupAndSortData.map(({ location, yearData, currentYearTotal }) => (
        <div key={location} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            {location} (Current Year Total: {currentYearTotal})
          </h3>
          {Object.entries(yearData)
            .sort((a, b) => b[0] - a[0])
            .map(([year, crimes]) => (
              <div key={year} className="ml-4 mb-4">
                <h4 className="text-lg font-medium mb-2">{year}</h4>
                <ul className="list-disc pl-5">
                  {Object.entries(crimes)
                    .sort((a, b) => b[1] - a[1])
                    .map(([crimeType, count]) => (
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

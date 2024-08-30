import React, { useMemo } from "react";

const CrimeSummary = ({ crimeData }) => {
  const currentYear = new Date().getFullYear().toString();

  const processedData = useMemo(() => {
    const result = {};

    Object.entries(crimeData).forEach(([crimeType, locations]) => {
      result[crimeType] = Object.entries(locations)
        .map(([location, yearData]) => ({
          location,
          incidents: yearData[currentYear] || 0,
        }))
        .filter((item) => item.incidents > 0) // Only include locations with incidents in the current year
        .sort((a, b) => b.incidents - a.incidents);
    });

    return result;
  }, [crimeData, currentYear]);

  return (
    <div className="p-4">
      {Object.entries(processedData).map(([crimeType, locations]) => (
        <div key={crimeType} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{crimeType}:</h3>
          {locations.map((loc, index) => (
            <p key={loc.location} className="ml-4">
              {index + 1}. {loc.location} {loc.incidents} incidents in{" "}
              {currentYear}
            </p>
          ))}
          {locations.length === 0 && (
            <p className="ml-4 italic">
              No incidents reported in {currentYear}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CrimeSummary;

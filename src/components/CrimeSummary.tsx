import React, { useMemo } from "react";
import { CrimeData } from "../types";

const CrimeSummary = ({ crimeData }: { crimeData: CrimeData }) => {
  console.log({ crimeData });
  return (
    <div className="p-4">
      {crimeData.map(([location, count]) => {
        console.log({ location, count });
        return (
          <div className="mb-6">
            <p className="text-xl font-semibold mb-2">{location}:</p>
            <p className="ml-4 italic">{count} crimes reported.</p>
          </div>
        );
      })}
    </div>
  );
};

export default CrimeSummary;

import { CrimeData } from "../types";

const CrimeSummary = ({ crimeData }: { crimeData: CrimeData }) => {
  console.log({ crimeData });
  return (
    <div className="p-4">
      <div className="mb-6 flex justify-between align-center ">
        <p className="text-lg font-semibold mb-2">Location</p>
        <p className="ml-4 text-lg font-semibold">Crimes reported.</p>
      </div>
      {crimeData.map(([location, count], index) => {
        console.log({ location, count });
        return (
          <div className="mb-2 flex justify-between align-center border-t border-gray-700 pt-4">
            <p className="text-md  mb-2">
              {index + 1}. {location}:
            </p>
            <p className=" text-gray-300">{count} Incidents</p>
          </div>
        );
      })}
    </div>
  );
};

export default CrimeSummary;

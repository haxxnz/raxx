import "./App.css";

function About() {
  return (
    <>
      <section className="w-full max-w-6xl mx-auto mt-8 ">
        <div className="bg-gray-900  rounded-md m-4 border border-gray-800">
        <h1 className="text-2xl font-semibold p-4 border-b border-gray-800">Raxx is a Crime Tracker</h1>
        <p className="p-4">
          Raxx shows you how crime is changing in New Zealand over time
        </p>
        <p className="p-4 pt-0">
          This website pulls data from policedata.nz and displays it both by
          subrub and by category. The data is updated monthly every time NZ
          Police updates their data and is available for free to the public. a
        </p>
        <p className="p-4 pt-0">Built by Walter Lim, Frank He, Russell Bloxwich</p>

        <div className="flex">
        <a className="p-4 border-gray-800 border bg-blue-600 rounded-lg">Link Repo Data</a>
          <a className="p-4 border-gray-800 border bg-blue-600 rounded-lg">Link to Data</a>
        </div>
        </div>
      </section>
    </>
  );
}

export default About;

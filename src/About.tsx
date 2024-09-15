import "./App.css";

function About() {
  return (
    <>
      <section className="w-full max-w-6xl mx-auto mt-4 ">
        <div className="bg-gray-950  rounded-xl m-4 border border-gray-800">
          <h1 className="text-2xl font-semibold p-4 border-b border-gray-800">Raxx is a Crime Tracker</h1>
          <p className="p-4">
            Raxx shows you how crime is changing in New Zealand over time
          </p>
          <p className="p-4 pt-0">
            This website pulls data from <a href="https://policedata.nz" className="underline text-blue-400">policedata.nz</a>, a public service provided by New Zealand Police. It simplifies it by
            suburb and by category. The data is updated monthly every time NZ
            Police update their datasets and is available for free to the public.
          </p>
          <p className="p-4 pt-0">Built by <a href="https://walt.online" className="underline text-blue-400">Walter Lim</a>, <a href="https://www.linkedin.com/in/franklinhyj/" className="underline text-blue-400">Frank He</a>, <a className="underline text-blue-400" href="https://www.reb.nz/">Russell Bloxwich</a></p>

          <div className="flex gap-4 p-4 border-t border-gray-800 flex-wrap">
            <a className="p-4 border-gray-800 border bg-blue-600 rounded-lg" href="https://github.com/haxxnz/raxx">Frontend Repo</a>

            <a className="p-4 border-gray-800 border bg-blue-600 rounded-lg" href="https://github.com/haxxnz/raxx-data">Processed Data Repo</a>
            <a className="p-4 border-gray-800 border bg-blue-600 rounded-lg" href="https://policedata.nz">Link to Data</a>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

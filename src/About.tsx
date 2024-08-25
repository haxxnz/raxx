import { useState } from "react";
import "./App.css";

function About() {
  return (
    <>
      <section className="w-full max-w-6xl mx-auto mt-8">
        <h1 className="text-5xl font-semibold">Raxx is a Crime Tracker</h1>
        <p className="pt-3">
          Raxx shows you how crime is changing in New Zealand over time
        </p>
        <p>
          This website pulls data from policedata.nz and displays it both by
          subrub and by category. The data is updated monthly every time NZ
          Police updates their data and is available for free to the public.
        </p>
        <p>Built by Walter Lim and Frank He</p>

        <div className="flex">
          <div>Link to Repo</div>
          <div>Link to Data</div>
        </div>
      </section>
    </>
  );
}

export default About;

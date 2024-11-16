import React, { useState } from "react";
import DayNightMode from "./DayNightMode.jsx";
import DisplayWatchTime from "./DisplayWatchTime.jsx";

const Home = () => {
  const [link, setLink] = useState("");
  const duration = link;

  // ========== SUBMIT HANDLER =========
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(link);
  };

  return (
    <>
      <header>
        <h1>
          <i className="fa-brands fa-youtube"></i> WatchWise
        </h1>
        <DayNightMode />
      </header>

      <main>
        {/* FORM */}
        <form action="" onSubmit={handleSubmit}>
          <input type="search" placeholder="Paste the YouTube Video Link here" value={link} onChange={(e) => setLink(e.target.value)} required />
          <button type="submit">Submit</button>
        </form>

        {/* VIDEO SECTION */}

        {/* WATCHTIME SECTION */}
        <DisplayWatchTime duration={duration} />
      </main>

      <footer>
        <p>
          Made with &#x1FA77; by{" "}
          <a href="https://manishmk.vercel.app/" target="_blank">
            Manish Kumar
          </a>
          , &copy; 2024{" "}
        </p>
      </footer>
    </>
  );
};

export default Home;

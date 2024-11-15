import React from "react";
import DayNightMode from "./DayNightMode.jsx";

const Home = () => {
  return (
    <>
      <header>
        <h1>
          <i className="fa-brands fa-youtube"></i> WatchWise
        </h1>
        <DayNightMode />
      </header>

      <main>
        <form action="">
          <input type="search" placeholder="Paste the YouTube Video Link here"/>
          <button type="submit">Submit</button>
        </form>
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

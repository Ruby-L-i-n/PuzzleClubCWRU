import React from 'react';


function Events() {
  const handleClickJoinUs = () => {
    window.open("https://community.case.edu/feeds?type=club&type_id=20709&tab=about", "_blank", "noopener,noreferrer");
  }
  return (
    <div className="events">
      <h1>Events</h1>
      <section>
        <h2>Past Events</h2>
        <p>Check out our instagram for past events</p>
        <button className="general-button" onClick={() => {window.open("https://www.instagram.com/puzzleclub.cwru/", "_blank", "noopener,noreferrer")}}>Instagram</button>
      </section>
      <section>
        <h2>Join our campus groups</h2>
        <p>Join our mailing list to receive the newest updates on upcoming events! </p>
        <button className="general-button" onClick={handleClickJoinUs}>Receive Updates</button>
      </section>
      <section>
        <h2>Check out our events calender</h2>
        <iframe src="https://calendar.google.com/calendar/embed?src=c_df68e88bfb18422cd0f37eef542a38850dca20bafefb1c6a30c67c9da2b15af8%40group.calendar.google.com&ctz=America%2FNew_York" 
          width="800" 
          height="600" 
          frameborder="0">
        </iframe>
      </section>
    </div>
  );
}


export default Events;
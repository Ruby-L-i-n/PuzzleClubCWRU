import React from 'react';

function PuzzleHunt() {
  return (
    <div className="puzzleHunt">
      <h1>Puzzle Hunt</h1>
      <p className='info'>Puzzle hunts are a fun and engaging experience where teams of 4-5 people compete to solve a series of puzzles. They often consist of many individual challenges, leading up to a meta-puzzle that requires solvers to synthesize their answers from previous puzzles. During these hunts, you might encounter puzzles of all kinds, including wordplay, logic, rebus, hidden clues in images, riddles, freestyle puzzles, and even challenges that involve physical or mechanical elements.</p>  
      <section>
        <h2>CWRU Fall 2025 Orientation Week Puzzle Hunt</h2>
        <p>Link to our last puzzle hunt</p>
        <button className="general-button" onClick={() => {window.open("https://docs.google.com/document/d/1Jm7aW2JSPzV5-xiGxbR3MWBcpD3glTpitXiUIo6ypbc/edit?tab=t.0", "_blank", "noopener,noreferrer")}}>Doc</button>
      </section>
    </div>
  );
}

export default PuzzleHunt;
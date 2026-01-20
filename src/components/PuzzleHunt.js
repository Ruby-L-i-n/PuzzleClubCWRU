import React from 'react';
import { FaKitchenSet, FaGamepad } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { PiForkKnifeFill } from "react-icons/pi";
import { RiPlantFill } from "react-icons/ri";




function PuzzleHunt() {
  return (
    <div className="puzzleHunt">
      <h1>Puzzle Hunt</h1>
      <p className='info'>Puzzle hunts are a fun and engaging experience where teams of 4-5 people compete to solve a series of puzzles. They often consist of many individual challenges, leading up to a meta-puzzle that requires solvers to synthesize their answers from previous puzzles. During these hunts, you might encounter puzzles of all kinds, including wordplay, logic, rebus, hidden clues in images, riddles, freestyle puzzles, and even challenges that involve physical or mechanical elements.</p>  
        <section style={{
    boxShadow: "0 0 20px rgba(255, 220, 150, 20)" // tiny subtle glow
  }}>
        <h2> Puzzle Club x UPB Masquerade Ball</h2>
        <p>Start The Masquerade Ball Puzzles Here</p>
        <button className="general-button" onClick={() => {window.open("https://docs.google.com/document/d/1aRV3Uign49RKAIf6drrT1T3sdlYguOixJQMD50rtLq0/edit?usp=sharing", "_blank", "noopener,noreferrer")}}><FaKitchenSet /> Kitchen</button>
        <button className="general-button" onClick={() => {window.open("https://docs.google.com/document/d/1R4NwSj2EGTHmBI8Z2_RIk83NzaTY2nrFMl4dBV3FjUg/edit?usp=sharing", "_blank", "noopener,noreferrer")}}><FaGamepad /> Game Room</button>
        <button className="general-button" onClick={() => {window.open("https://docs.google.com/document/d/1aRV3Uign49RKAIf6drrT1T3sdlYguOixJQMD50rtLq0/edit?usp=sharing", "_blank", "noopener,noreferrer")}}><FaBookOpen /> Library</button>
        <button className="general-button" onClick={() => {window.open("https://docs.google.com/document/d/1aRV3Uign49RKAIf6drrT1T3sdlYguOixJQMD50rtLq0/edit?usp=sharing", "_blank", "noopener,noreferrer")}}><RiPlantFill /> Conservatory</button>
        <button className="general-button" onClick={() => {window.open("https://docs.google.com/document/d/1aRV3Uign49RKAIf6drrT1T3sdlYguOixJQMD50rtLq0/edit?usp=sharing", "_blank", "noopener,noreferrer")}}><PiForkKnifeFill /> Dining Room</button>
        <button className="general-button" onClick={() => {window.open("https://docs.google.com/document/d/1aRV3Uign49RKAIf6drrT1T3sdlYguOixJQMD50rtLq0/edit?usp=sharing", "_blank", "noopener,noreferrer")}}><FaPaintBrush /> Art Room</button>
      </section>
      {/* <section>
        <h2>CWRU Fall 2025 Orientation Week Puzzle Hunt</h2>
        <p>Link to our last puzzle hunt</p>
        <button className="general-button" onClick={() => {window.open("https://docs.google.com/document/d/1Jm7aW2JSPzV5-xiGxbR3MWBcpD3glTpitXiUIo6ypbc/edit?tab=t.0", "_blank", "noopener,noreferrer")}}>Doc</button>
      </section> */}
    </div>
  );
}

export default PuzzleHunt;
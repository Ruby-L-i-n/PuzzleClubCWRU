import React from 'react';
import './Resources.css';

//execs 
const execs = [
  {
    name: "Kanthi",
    role: "President",
    year: "Senior",
    major: "Biomedical Engineering",
    puzzle: "Logic grid puzzles",
    photo: "exec_photos/Kanthi.png",
  },
  {
    name: "Kashika",
    role: "Secretary",
    year: "Senior",
    major: "Biochemistry",
    puzzle: "Tavern/Ring Puzzles",
    photo: "exec_photos/Kashika.png",
  },
  {
    name: "Satviki",
    role: "Treasurer",
    year: "Senior",
    major: "Neuroscience",
    puzzle: "Crosswords",
    photo: "exec_photos/Satviki.png",
  },
  {
    name: "Tanvi",
    role: "Risk Manager",
    year: "Senior",
    major: "Neuroscience",
    puzzle: "NYT Games",
    photo: "exec_photos/Tanvi.png",
  },
  {
    name: "Ruby",
    role: "Head of Design",
    year: "Senior",
    major: "Computer Science",
    puzzle: "Jigsaws/Math Puzzles",
    photo: "exec_photos/Ruby.png",
  },
  {
    name: "Sreyash",
    role: "Membership",
    year: "Senior",
    major: "Computer Science",
    puzzle: "Jigsaws/Math Puzzles",
    photo: "exec_photos/Sreyash.png",
  },
];



function Resources() {
  return (
    <div className="resources">
      <h1>Resources</h1>
      <h2 className='res-title'>Meet Our Execs!</h2>
     <div className="exec-grid">
        {execs.map((exec, index) => (
          <div key={index} className="exec-card">
            <img src={exec.photo} alt={exec.name} className="exec-photo" />
            <h3>{exec.name}</h3>
            <p><strong>{exec.role}</strong></p>
            <p>{exec.year} • {exec.major}</p>
            <p>Favorite Puzzle: {exec.puzzle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;
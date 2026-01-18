import KanthiPhoto from '../assets/exec_photos/Kanthi.png';
import KashikaPhoto from '../assets/exec_photos/Kashika.png';
import SatvikiPhoto from '../assets/exec_photos/Satviki.png';
import RubyPhoto from '../assets/exec_photos/Ruby.png';
import SreyashPhoto from '../assets/exec_photos/Sreyash.png';
import JeannellePhoto from "../assets/exec_photos/Jeannelle.jpeg";

import './Resources.css';

//execs 
const execs = [
  { name: "Kanthi", role: "President", year: "Senior", major: "Biomedical Engineering", puzzle: "Logic grid puzzles", photo: KanthiPhoto },
    { name: "Sreyash", role: "Vice-President", year: "Sophomore", major: "", puzzle: "Logic grid puzzles", photo: SreyashPhoto },
  { name: "Kashika", role: "Secretary", year: "Senior", major: "Biochemistry", puzzle: "Tavern/Ring Puzzles", photo: KashikaPhoto },
  { name: "Satviki", role: "Treasurer", year: "Senior", major: "Neuroscience", puzzle: "Crosswords", photo: SatvikiPhoto },
  { name: "Ruby", role: "Head of Design", year: "Senior", major: "Computer Science", puzzle: "Jigsaws/Math Puzzles", photo: RubyPhoto },
  { name: "Jeannelle", role: "Design Assistant", year: "Freshman", major: "Computer Science", puzzle: "Zebra Puzzles", photo: JeannellePhoto },
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
import Logo from './assets/image/puzzle_nobackgraound.png';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import './App.css';
import { FaInstagram } from "react-icons/fa";
import PuzzleHunt from './components/PuzzleHunt';
import Events from './components/Events';
import Resources from './components/Resources';
import Contact from './components/Contact';

const openLink = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

function App() {
  return (
    <HashRouter>
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <Link to="/">
              <img src={Logo} alt="Puzzle Club Logo" className="App-logo" />
            </Link>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/puzzle-hunt">Puzzle Hunt</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/resources">Resources</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/puzzle-hunt" element={<PuzzleHunt />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
        <footer className="App-header">
          <nav>
            <button className='App-button' onClick={() => openLink("https://www.instagram.com/puzzleclub.cwru/")}><FaInstagram /></button>
          </nav>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
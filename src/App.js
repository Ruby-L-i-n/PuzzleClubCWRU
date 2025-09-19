import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import './App.css';
import PuzzleHunt from './components/PuzzleHunt';
import Events from './components/Events';
import Resources from './components/Resources';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
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
            <button className='App-button'>to ig</button>
            <button className='App-button'>to</button>
          </nav>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
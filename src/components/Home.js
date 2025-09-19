import React from 'react';
//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    //TODO: change link to our campus groups 
    const handleClickJoinUs = () => {
        window.open("https://community.case.edu/PUZCLUB/club_signup", "_blank", "noopener,noreferrer");
    }

    const handleClickEvents = () => {
        navigate('/events')
    }

    const handleClickPuzzleHunt = () => {
        navigate('/puzzle-hunt')
    }

    const handleClickAbout = () => {
        navigate('/about')
    }
    return (
        <div>
            <div className="home">
                <h1>Puzzle Club</h1>
                <p>Puzzle Club is a welcoming space for students interested in promoting and solving puzzles—no experience required! We explore a wide variety of puzzles, including (but not limited to) jigsaw puzzles, cryptograms, word puzzles, logic puzzles, mechanical puzzles, and riddles.  As a club, we'll work together to take on various puzzle hunts, including the MIT Mystery Hunt and Puzzle Hunt CMU, while also hosting our very own. Whether you're looking to challenge yourself, collaborate with others, or just have fun, Puzzle Club is a great place to connect with fellow puzzle enthusiasts.</p>
                <button className="general-button" onClick={handleClickAbout}>About US</button>
            </div>
            <div className="home-body">
                <section className='textured-card'>
                    <h2>Learn More About The Puzzle Hunt</h2>
                    <p>Click to learn more about our annual puzzle hunt events!</p>
                    <button className="general-button" onClick={handleClickPuzzleHunt}>Read More</button>
                </section>
                <section className='textured-card'>
                    <h2>Join Our Puzzle Club!</h2>
                    <p>Sign up for our mailing list to receive the latest updates and event notifications on CampusGroups!</p>
                    <button className="general-button" onClick={handleClickJoinUs}>Join Us!</button>
                </section>
                <section className='textured-card'>
                    <h2>Explore Our Events</h2>
                    <p>Curious about our past events or want to stay updated on upcoming activities? Check out our event archive and club calendar.</p>
                    <button className="general-button" onClick={handleClickEvents}>View Events & Calendar</button>
                </section>
            </div>
        </div>
    );
}


export default Home;


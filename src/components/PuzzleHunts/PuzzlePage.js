import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { verifyPuzzleAnswer } from '../../services/puzzle_service';
import { checkIfPuzzleSolved } from '../../services/puzzle_service';
import './PuzzleList.css';

const puzzleData = {
    101: { title: 'Study', driveLink: 'https://drive.google.com/file/d/1vjSxzpTMzf7wd70JSiz-i5pbLF3xEFN4/preview' },
    102: { title: 'Game Room', driveLink: 'https://drive.google.com/file/d/1KpP4wmmYFNNarEUhTQGrgkeSNypNouqD/preview' },
    103: { title: 'Library', driveLink: 'https://drive.google.com/file/d/17p5odFH_sLWHVBm0TAl9_yxcl-ewYQ3c/preview' },
    104: { title: 'Conservatory', driveLink: 'https://drive.google.com/file/d/1SpFllogb9soytxxs7a8fvAZeDUJ8tMI8/preview' },
    105: { title: 'Dining Room', driveLink: 'https://drive.google.com/file/d/1PL7QxKBwWMbek81Yjb5H_aqAdol0tBHX/preview' },
    106: { title: 'Art Room', driveLink: 'https://drive.google.com/file/d/10C20ZVT41hPRti4cqCkZsiY6epTEU8_a/preview' },
    107: { title: 'Meta Puzzle', driveLink: 'https://drive.google.com/file/d/1DBONh7l35P1cEV3CNI2WcS6eWJRgHIu-/preview' },
};

export default function PuzzlePage() {
    const { id } = useParams(); // just get the id
    const [puzzle, setPuzzle] = useState(null);
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [solved, setSolved] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [solvedData, setSolvedData] = useState({ solved: false, answer: null });

    useEffect(() => {
        async function checkSolve() {
            const result = await checkIfPuzzleSolved(id);
            setSolvedData(result);
            if (result.solved) {
                setSolved(true);
                setSuccess(true);
        }
        }
        checkSolve();
    }, [id]);


    useEffect(() => {
        // fetch or lookup puzzle by id
        setPuzzle(puzzleData[id] || null);
    }, [id]);

    const handleChange = (e) => setAnswer(e.target.value);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        const result = await verifyPuzzleAnswer(id, answer);
        if (result.success) {
            setSolved(true);
            setSuccess(true);
        }
        setMessage(result.message);
        setLoading(false);
    };

    if (!puzzle) return <p>Puzzle not found</p>;

    return (
        <div className="puzzle-page">
            <div className="puzzle-overlay" style={{ maxWidth: '900px' }}>
                <h1 className="puzzle-title">{puzzle.title}</h1>
                <div>
                    {solvedData.solved && (
                        <p>Your group has already solved this puzzle! Answer: {solvedData.answer}</p>
                    )}
                </div>

                <form onSubmit={handleSubmit} style={{ width: '100%', marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Enter your answer..."
                        value={answer}
                        onChange={handleChange}
                        disabled={solved || loading}
                        className="puzzle-input"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '1.2rem',
                            marginBottom: '10px',
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            borderRadius: '8px',
                            backgroundColor: '#a54b34',
                            color: 'white',
                            fontSize: '1rem',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        {loading ? 'Checking...' : 'Submit'}
                    </button>
                    <p style={{ marginTop: 10, color: success ? 'limegreen' : 'red', fontWeight: 500 }}>
                        {message}
                    </p>
                </form>

                <div style={{ width: '100%', height: '600px' }}>
                    <iframe
                        title={puzzle.title}
                        src={puzzle.driveLink}
                        width="100%"
                        height="100%"
                        style={{ border: 'none', borderRadius: '8px' }}
                        allow="fullscreen"
                    />
                </div>
            </div>
        </div>
    );
}
import { useAuth } from './AuthContext'
import { getGroupLeaderboard } from '../../services/group_service'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './ClueHunt.css'
import invitePdf from '../../assets/image/invite.pdf' 

export default function ClueHunt() {
    const { user, loading } = useAuth()
    const navigate = useNavigate()
    const [timeLeft, setTimeLeft] = useState('')
    const [huntStarted, setHuntStarted] = useState(false)
    const [leaderboard, setLeaderboard] = useState([])

    useEffect(() => {
        const target = new Date('April 4, 2026 12:00:00 EST')

        const interval = setInterval(() => {
            const now = new Date()
            const diff = target - now

            if (diff <= 0) {
                setTimeLeft('')
                setHuntStarted(true)
                clearInterval(interval)
                return
            }
            
            setHuntStarted(false)
            const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
            const minutes = Math.floor((diff / (1000 * 60)) % 60)
            const seconds = Math.floor((diff / 1000) % 60)

            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const fetchLeaderboard = async () => {
        const result = await getGroupLeaderboard()
        if (result.success) {
            setLeaderboard(result.leaderboard)
        }else{
            console.error('Error fetching leaderboard:', result.error)
        }
    }

    useEffect(() => {
        if (huntStarted) {
            fetchLeaderboard()
            // Refresh leaderboard every 30 seconds
            const interval = setInterval(fetchLeaderboard, 30000)
            return () => clearInterval(interval)
        }
    }, [huntStarted])

    if (loading) return <div>Loading...</div>

    return (
        <div className="cluehunt-page">

            <div className="cluehunt-overlay">
                <h1 className="cluehunt-title">Clue Hunt</h1>

                <div className="cluehunt-countdown">
                    {timeLeft}
                </div>

                {huntStarted && (
                    <button
                        className="cluehunt-start-hunt"
                        onClick={() => navigate('/puzzle-hunt/clue-hunt/puzzles')}
                        style={{ marginBottom: '2rem' }}
                    >
                        START HUNT
                    </button>
                )}

                {!huntStarted && (
                    <>
                        <p className="cluehunt-info">
                            Join us at Bellflower Hall April 4th 12:30 PM EST
                        </p>
                    </>
                )}

                <p className="cluehunt-subtitle">
                            Following the passing of her husband, the late Mr. Boddy, Dr. Phyllis Orchid has opened her home for an estate sale. What begins as a simple sale won't stay that way for long in this Clue-themed murder mystery puzzle hunt.
                </p>

                <div className="cluehunt-actions">

                    {!user ? (
                        <button
                            className="cluehunt-card-button"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    ) : (
                        <>
                            <button
                                className="cluehunt-card-button"
                                onClick={() => navigate('/group')}
                            >
                                Your Group
                            </button>

                            <button
                                className="cluehunt-card-button"
                                onClick={() => navigate('/login')}
                            >
                                Profile
                            </button>
                        </>
                    )}

                </div>
                <button
                    className="cluehunt-card-button"
                      onClick={() => window.open(invitePdf, '_blank')}
                >
                    Official Event Invite
                </button>

                {huntStarted && (
                    <div className="leaderboard-container">
                        <h2 className="leaderboard-title">Leaderboard</h2>
                        <div className="leaderboard-list">
                            {leaderboard.length === 0 ? (
                                <p className="leaderboard-empty">No teams yet. Be the first!</p>
                            ) : (
                                leaderboard.map((group) => (
                                    <div 
                                        key={group.id} 
                                        className={`leaderboard-item ${group.rank <= 3 ? `rank-${group.rank}` : ''}`}
                                    >
                                        <div className="leaderboard-rank">#{group.rank}</div>
                                        <div className="leaderboard-name">{group.name}</div>
                                        <div className="leaderboard-score">{group.score} solved</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                <div className="cluehunt-footer">
                    <p>Need help? Contact us at puzzleclub@case.edu.</p>
                    <p
                        className="cluehunt-link"
                        onClick={() => navigate('/')}
                    >
                        Learn more about Puzzle Club
                    </p>
                </div>
            </div>
        </div>
    )
}
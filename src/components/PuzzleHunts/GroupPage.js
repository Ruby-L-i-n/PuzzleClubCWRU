// src/components/Group.js
import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import { createGroup, joinGroup, getUserGroup, leaveGroup } from '../../services/group_service'
import './GroupPage.css'

export default function Group() {
    const { user, loading } = useAuth()
    const navigate = useNavigate()
    const [groupName, setGroupName] = useState('')
    const [joinCode, setJoinCode] = useState('')
    const [currentGroup, setCurrentGroup] = useState(null)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (user) fetchGroup()
    }, [user])

    const fetchGroup = async () => {
        const res = await getUserGroup()
        if (res.success) setCurrentGroup(res.group)
    }

    const handleCreateGroup = async () => {
        if (!groupName) return setMessage('Enter a group name')
        const res = await createGroup(groupName)
        if (res.success) {
            setMessage(`Created group: ${res.group.name}`)
            setCurrentGroup(res.group)
        } else {
            setMessage(`Error: ${res.error}`)
        }
    }

    const handleJoinGroup = async () => {
        if (!joinCode) return setMessage('Enter a join code')
        const res = await joinGroup(joinCode)
        if (res.success) {
            setMessage(`Joined ${res.group.name}`)
            setCurrentGroup(res.group)
        } else {
            setMessage(`Error: ${res.error}`)
        }
    }

    const handleLeaveGroup = async () => {
        if (!currentGroup) return
        const res = await leaveGroup(currentGroup.id)
        if (res.success) {
            setMessage(`Left group: ${currentGroup.name}`)
            setCurrentGroup(null)
        } else {
            setMessage(`Error: ${res.error}`)
        }
    }

    if (loading) return <div className="group-page"><div className="group-container">Loading...</div></div>
    if (!user) return <div className="group-page"><div className="group-container">Login to manage your group</div></div>

    return (
        <div className="group-page">
            <div className="group-container">
                <h2>Group Management</h2>

                {currentGroup ? (
                    <>
                        <p>You are part of <strong>{currentGroup.name}</strong>!</p>
                        <p className="group-id">{currentGroup.id}</p>
                        <p className="group-id-info">Copy and share this group ID with your friends to join!</p>
                        <p>You can have up to 5 people in your group.</p>
                        <button onClick={handleLeaveGroup}>Leave Group</button>
                        <button onClick={() => navigate('/puzzle-hunt/clue-hunt')}>Back to Clue Hunt</button>
                    </>
                ) : (
                    <>
                        <p className='group-id'>You are not in a group</p>
                        <p>You need to be in a group to participate! (max 5 people)</p>

                        <div className="group-row">
                            <input
                                placeholder="New group name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                            <button onClick={handleCreateGroup}>Create a New Group</button>
                        </div>

                        {/* Join Group */}
                        <div className="group-row">
                            <input
                                placeholder="Join code (group ID)"
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value)}
                            />
                            <button onClick={handleJoinGroup}>Join a Existing Group</button>
                        </div>
                    </>
                )}

                {message && <p className="group-message">{message}</p>}
            </div>
        </div>
    )
}
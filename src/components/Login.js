import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../services/supabase'
import { useAuth } from './PuzzleHunts/AuthContext'
import './Login.css'

export default function Login() {
  const { user, signOut } = useAuth()

  return (
    <div className="login-page">
      <div className="login-card">
        {user ? (
          <>
            <h2>Welcome back, {user.email}!</h2>
            <p>You are signed in.</p>
            <button className="signed-in-button" onClick={signOut}>
              Sign Out
            </button>
            <button className="signed-in-button" onClick={() => window.open("#/puzzle-hunt/clue-hunt", "_self")}>
              Go to Clue Hunt
            </button>
          </>
        ) : (
          <>
            <h2>Welcome to Puzzle Club</h2>
            <p>Sign in to join our puzzle hunts and events!</p>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={[]}
            />
          </>
        )}
      </div>
    </div>
  )
}
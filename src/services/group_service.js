import { supabase } from './supabase'


// Create a new group
export async function createGroup(groupName) {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('Must be logged in to create a group')
    }

    // Create the group
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .insert({
        name: groupName,
        created_by: user.id
      })
      .select()
      .single()

    if (groupError) throw groupError

    // Automatically add creator to the group
    const { error: memberError } = await supabase
      .from('user_groups')
      .insert({
        group_id: group.id,
        user_id: user.id
      })

    if (memberError) throw memberError

    return { success: true, group }
  } catch (error) {
    console.error('Error creating group:', error)
    return { success: false, error: error.message }
  }
}

// Join a group using the group's UUID as join code
export async function joinGroup(joinCode) {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('Must be logged in to join a group')
    }

    // Find the group by ID (the join code IS the group ID)
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('*')
      .eq('id', joinCode)
      .single()

    if (groupError || !group) {
      throw new Error('Invalid join code')
    }

    // Add user to the group
    const { error: memberError } = await supabase
      .from('user_groups')
      .insert({
        group_id: group.id,
        user_id: user.id
      })

    if (memberError) throw memberError

    return { success: true, group }
  } catch (error) {
    console.error('Error joining group:', error)
    return { success: false, error: error.message }
  }
}

// Get the user's current group (since they can only be in one)
export async function getUserGroup() {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('Must be logged in')
    }

    const { data, error } = await supabase
      .from('user_groups')
      .select(`
        *,
        groups (
          id,
          name,
          created_at,
          created_by
        )
      `)
      .eq('user_id', user.id)
      .single()

    if (error) {
      // No group found is not an error, just means user isn't in a group
      if (error.code === 'PGRST116') {
        return { success: true, group: null }
      }
      throw error
    }

    return { success: true, group: data.groups }
  } catch (error) {
    console.error('Error fetching user group:', error)
    return { success: false, error: error.message }
  }
}


// Leave a group
export async function leaveGroup(groupId) {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('Must be logged in')
    }

    const { error } = await supabase
      .from('user_groups')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', user.id)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error leaving group:', error)
    return { success: false, error: error.message }
  }
}

export async function getGroupLeaderboard() {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('Must be logged in')
    }

    const { data, error } = await supabase
      .from('groups')
      .select(`
        id,
        name,
        created_at,
        group_puzzle_solves (
          is_correct,
          solved_at
        )
      `)

    if (error) throw error

    const leaderboard = data.map(group => {
      const solves = group.group_puzzle_solves || []

      const correctSolves = solves.filter(s => s.is_correct === true)

      const score = correctSolves.length

      // when they reached their latest correct solve
      const lastSolveTime = score > 0
        ? Math.max(...correctSolves.map(s => new Date(s.solved_at).getTime()))
        : Infinity

      return {
        id: group.id,
        name: group.name,
        score,
        lastSolveTime
      }
    })

    leaderboard.sort((a, b) => {
      // higher score first
      if (b.score !== a.score) {
        return b.score - a.score
      }

      // tie breaker: earlier finish wins
      return a.lastSolveTime - b.lastSolveTime
    })

    const rankedLeaderboard = leaderboard.map((group, index) => ({
      ...group,
      rank: index + 1
    }))

    return {
      success: true,
      leaderboard: rankedLeaderboard.slice(0, 3)
    }

  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return { success: false, error: error.message }
  }
}
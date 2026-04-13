// puzzleService.js
import { supabase } from './supabase';

/**
 * Helper: keep only letters and numbers, lowercase
 */
function normalizeAnswer(str) {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

/**
 * Verify a puzzle answer for the logged-in user and insert solve record if correct.
 * Handles special puzzle 107 with max 3 attempts per group.
 * @param {number} puzzleId - ID of the puzzle being solved
 * @param {string} answer - User-provided answer
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function verifyPuzzleAnswer(puzzleId, answer) {
  // 1. Check logged-in user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user || userError) {
    return { success: false, message: 'You must be logged in to submit answers.' };
  }

  // 2. Check if user has a group
  const { data: groupData, error: groupError } = await supabase
    .from('user_groups')
    .select('group_id')
    .eq('user_id', user.id)
    .single();

  if (groupError || !groupData) {
    return { success: false, message: 'You must belong to a group to submit answers.' };
  }

  const groupId = groupData.group_id;

  // 3. Fetch the puzzle correct answer
  const { data: puzzle, error: puzzleError } = await supabase
    .from('puzzles')
    .select('answer')
    .eq('id', puzzleId)
    .single();

  if (puzzleError || !puzzle) {
    return { success: false, message: 'Puzzle not found.' };
  }

  const normalizedAnswer = normalizeAnswer(answer);
  const correctAnswer = normalizeAnswer(puzzle.answer);
  console.log(`Normalized user answer: ${normalizedAnswer}, puzzleid: ${puzzleId}, groupId: ${groupId}`);

  // 4. Special logic for puzzle 107
  if (puzzleId === "107") {
    console.log(`Processing puzzle 107 for group: ${groupId}`);
    // Count previous attempts for this group
    const { data: attempts } = await supabase
      .from('group_puzzle_solves')
      .select('id')
      .eq('puzzle_id', Number(puzzleId))
      .eq('group_id', groupId);

    if (attempts && attempts.length >= 3) {
      return { success: false, message: 'You have reached the maximum of 3 attempts for this puzzle.' };
    }

    const isCorrect = normalizedAnswer === correctAnswer;

    const { error: insertError } = await supabase
      .from('group_puzzle_solves')
      .insert([{ group_id: groupId, puzzle_id: puzzleId, solved_at: new Date(), is_correct: isCorrect }])
      .select();

    if (insertError) {
        console.error('Insert error details:', insertError);
      return { success: false, message: 'Error recording attempt.' };
    }

    if (isCorrect) {
      return { success: true, message: 'Correct! Your group has solved the puzzle.' };
    } else {
      return { success: false, message: `Incorrect. You have ${3 - (attempts?.length ?? 0) - 1} tries left.` };
    }
  }

  // 5. Normal puzzles: only insert if correct
  if (normalizedAnswer !== correctAnswer) {
    return { success: false, message: 'Incorrect answer. Try again!' };
  }

  const { error: insertError } = await supabase
    .from('group_puzzle_solves')
    .insert([{ group_id: groupId, puzzle_id: puzzleId, solved_at: new Date(), is_correct: true }])
    .select();

  if (insertError) {
    if (insertError.code === '23505') {
      return { success: true, message: 'Puzzle already solved by your group!' };
    }
    console.error('Insert error details:', insertError);
    return { success: false, message: 'Error recording solution.' };
  }

  return { success: true, message: 'Correct! Your group has solved the puzzle.' };
}

export async function checkIfPuzzleSolved(puzzleId) {
  // 1. Get logged-in user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user || userError) {
    return { solved: false, answer: null };
  }

  // 2. Get user's group
  const { data: groupData, error: groupError } = await supabase
    .from('user_groups')
    .select('group_id')
    .eq('user_id', user.id)
    .single();

  if (groupError || !groupData) {
    return { solved: false, answer: null };
  }

  const groupId = groupData.group_id;

  // 3. Check if there is a correct solve
  const { data: solveData, error: solveError } = await supabase
    .from('group_puzzle_solves')
    .select('is_correct')
    .eq('puzzle_id', puzzleId)
    .eq('group_id', groupId)
    .eq('is_correct', true)
    .single();

  if (solveError || !solveData) {
    return { solved: false, answer: null };
  }

  // 4. Fetch the correct puzzle answer
  const { data: puzzle, error: puzzleError } = await supabase
    .from('puzzles')
    .select('answer')
    .eq('id', puzzleId)
    .single();

  if (puzzleError || !puzzle) {
    return { solved: true, answer: null }; // solved but answer fetch failed
  }

  return { solved: true, answer: puzzle.answer };
}
import React from 'react';
import './PuzzleList.css';
import { FaGamepad } from "react-icons/fa";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaPenFancy } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { RiPlantFill } from "react-icons/ri";
import { FaFile } from "react-icons/fa";
import { FaPuzzlePiece } from "react-icons/fa6";


const puzzles = [
  { id: 0, title: "Intro", link: "https://drive.google.com/file/d/1Dw33Gm32CA6JGs8Ku-745Z_FMtQ7PiYe/preview", icon: <FaFile /> },
  { id: 101, title: 'Study', link: '#/puzzle-hunt/clue-hunt/puzzles/101', icon: <FaPenFancy />},
  { id: 102, title: 'Game Room', link: '#/puzzle-hunt/clue-hunt/puzzles/102', icon: <FaGamepad /> },
  { id: 103, title: 'Library', link: '#/puzzle-hunt/clue-hunt/puzzles/103', icon: <FaBookOpen /> },
  { id: 104, title: 'Conservatory', link: '#/puzzle-hunt/clue-hunt/puzzles/104', icon: <RiPlantFill /> },
  { id: 105, title: 'Dining Room', link: '#/puzzle-hunt/clue-hunt/puzzles/105', icon: <TbToolsKitchen2 /> },
  { id: 106, title: 'Art Room', link: '#/puzzle-hunt/clue-hunt/puzzles/106', icon: <FaPaintBrush /> },
  { id: 107, title: 'Meta Puzzle', link: '#/puzzle-hunt/clue-hunt/puzzles/107', icon: <FaPuzzlePiece /> },
];

export default function PuzzleListPage() {
  return (
    <div className="puzzle-page">
      <div className="puzzle-overlay">
        <h1 className="puzzle-title">Puzzle List</h1>

        <div className="puzzle-list">
          {puzzles.map((puzzle) => (
            <a
              key={puzzle.id}
              href={puzzle.link}
              className="puzzle-link"
            >
              <span className="puzzle-icon">{puzzle.icon}</span> {puzzle.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

const colors = [
  "#64748b",
  "#6b7280",
  "#71717a",
  "#737373",
  "#78716c",
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export type Note = {
  id: string;
  content: string;
  dateAdded: Date;
  loved: boolean;
  coords: {
    x: number;
    y: number;
  };
  color: string;
};

export type Board = {
  id: string;
  title: string;
  notes: Note[];
  color: string;
};

const DEFAULT_NOTE: Note = {
  id: "1",
  content:
    "How to 😎\n\n - Click anywhere to add a new note. \n - Hover on each note to show options. \n - Click on Your Boards to view and create a new board \n - Love you, Harry ❤️",
  dateAdded: new Date(),
  loved: false,
  coords: {
    x: 50,
    y: 100,
  },
  color: getRandomColor(),
};

const getNewBoard = () => {
  const randomColor = getRandomColor();

  const board: Board = {
    id: uuid(),
    title: `untitled`,
    notes: [{ ...DEFAULT_NOTE, color: randomColor }],
    color: randomColor,
  };

  return board;
};

const DEFAULT_BOARDS = [getNewBoard()];

export default defineStore("stickies", {
  state() {
    const storage =
      localStorage.getItem("boards") || JSON.stringify(DEFAULT_BOARDS);
    const boards = JSON.parse(storage) as Board[];

    return {
      boards,
      activeBoard: boards[0],
      boardsListOpen: false,
      prev: null as HTMLDivElement | null,
    };
  },
  actions: {
    save() {
      localStorage.setItem("boards", JSON.stringify(this.boards));
    },
    clear() {
      const board = this.boards.find(
        (board) => board.id === this.activeBoard.id
      );

      if (board) {
        board.notes = [];
      }

      this.save();
    },
    newBoard() {
      const board = getNewBoard();

      this.boards.push(board);

      this.activeBoard = board;
      this.save();
    },
    deleteBoard(boardId: string) {
      this.boards = this.boards.filter((board) => board.id !== boardId);

      this.save();

      if (boardId === this.activeBoard.id) {
        this.activeBoard = this.boards[0];
      }
    },
    newNote(coords: { x: number; y: number }) {
      const board = this.boards.find(
        (board) => board.id === this.activeBoard.id
      );
      if (board) {
        const note: Note = {
          id: uuid(),
          content: "",
          dateAdded: new Date(),
          loved: false,
          coords,
          color: getRandomColor(),
        };
        board.notes.push(note);
      }

      this.save();
    },
    deleteNote(id: string) {
      const board = this.boards.find(
        (board) => board.id === this.activeBoard.id
      );
      if (board) {
        board.notes = board.notes.filter((note) => note.id !== id);
      }

      this.save();
    },
    love(id: string) {
      const board = this.boards.find(
        (board) => board.id === this.activeBoard.id
      );
      if (board) {
        const note = board.notes.find((note) => note.id === id);

        if (note) {
          if (note.loved) {
            note.loved = false;
          } else {
            note.loved = true;
          }
        }
      }
      this.save();
    },
    updateNoteContent(id: string, newContent: string) {
      const board = this.boards.find(
        (board) => board.id === this.activeBoard.id
      );
      if (board) {
        const note = board.notes.find((note) => note.id === id);

        if (note) {
          if (note.loved) {
            note.content = newContent;
          } else {
            note.content = newContent;
          }
        }
      }
      this.save();
    },
  },
});

import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import type { Ref } from "vue";
import type { HapticInput } from "web-haptics";
import { triggerHaptic } from "../lib/haptics";

type ThemeMode = "system" | "light" | "dark";

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

const getNextColor = (prev: string) => {
  const prevIndex = colors.indexOf(prev);

  if (prevIndex < 0) {
    return getRandomColor();
  }

  return colors[prevIndex + 1 > colors.length - 1 ? 0 : prevIndex + 1];
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
  zIndex?: number;
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
  zIndex: 1,
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

type Config = {
  prevID: string | null;
  activeBoardID: string;
  offset: {
    x: number;
    y: number;
  };
  zoom: number;
  focusFavorites: boolean;
  theme: ThemeMode;
  showGrid: boolean;
  hapticsEnabled: boolean;
  topZIndex: number;
};

const DEFAULT_CONFIG: Config = {
  prevID: null,
  activeBoardID: DEFAULT_BOARDS[0].id,
  offset: {
    x: 0,
    y: 0,
  },
  zoom: 1,
  focusFavorites: false,
  theme: "system",
  showGrid: true,
  hapticsEnabled: true,
  topZIndex: 1,
};

const getSavedBoards = () => {
  const storage =
    localStorage.getItem("boards") || JSON.stringify(DEFAULT_BOARDS);
  const boards = JSON.parse(storage) as Board[];

  return boards;
};

const getSavedConfig = () => {
  const storage =
    localStorage.getItem("config") || JSON.stringify(DEFAULT_CONFIG);

  const config = {
    ...DEFAULT_CONFIG,
    ...(JSON.parse(storage) as Partial<Config>),
  };

  return config;
};

export default defineStore("stickies", {
  state() {
    const boards = getSavedBoards();
    const config = getSavedConfig();

    return {
      boards,
      boardsListOpen: false,
      settingsOpen: false,
      clearBoardConfirmOpen: false,
      isDraggingNote: false,
      isPanningBoard: false,
      config,
    };
  },
  getters: {
    activeBoard: (state): Board => {
      return (
        state.boards.find((board) => board.id === state.config.activeBoardID) ||
        state.boards[0]
      );
    },
    prev: (state): HTMLDivElement | null => {
      if (state.config.prevID) {
        return document.getElementById(
          state.config.prevID
        ) as HTMLDivElement | null;
      }

      return null;
    },
    favoriteNotesCount: (state): number => {
      const activeBoard =
        state.boards.find((board) => board.id === state.config.activeBoardID) ||
        state.boards[0];

      return activeBoard?.notes.filter((note) => note.loved).length || 0;
    },
  },
  actions: {
    bringToTop(note: Ref<HTMLDivElement | null>) {
      if (note.value) {
        const shouldHaptic = this.config.prevID !== note.value.id;
        const board = this.boards.find(
          (board) => board.id === this.activeBoard.id
        );
        const boardNote = board?.notes.find(
          (boardNote) => boardNote.id === note.value?.id
        );

        this.config.topZIndex += 1;
        note.value.style.zIndex = `${this.config.topZIndex}`;

        this.config.prevID = note.value.id;
        if (boardNote) {
          boardNote.zIndex = this.config.topZIndex;
        }
        if (shouldHaptic) {
          this.haptic("selection");
        }
      }
      this.save();
    },
    save() {
      localStorage.setItem("boards", JSON.stringify(this.boards));
      localStorage.setItem("config", JSON.stringify(this.config));
    },
    haptic(input: HapticInput = "selection") {
      if (this.config.hapticsEnabled) {
        triggerHaptic(input);
      }
    },
    applyTheme() {
      const prefersDark =
        window.matchMedia?.("(prefers-color-scheme: dark)").matches || false;
      const isDark =
        this.config.theme === "dark" ||
        (this.config.theme === "system" && prefersDark);

      document.documentElement.classList.toggle("dark", isDark);
    },
    setTheme(theme: ThemeMode) {
      this.config.theme = theme;
      this.applyTheme();
      this.save();
      this.haptic("selection");
    },
    setShowGrid(value: boolean) {
      this.config.showGrid = value;
      this.save();
      this.haptic("selection");
    },
    setHapticsEnabled(value: boolean) {
      this.config.hapticsEnabled = value;
      this.save();

      if (value) {
        triggerHaptic("success");
      }
    },
    resetCanvasView() {
      this.config.offset = {
        x: 0,
        y: 0,
      };
      this.config.zoom = 1;
      this.save();
      this.haptic("medium");
    },
    openSettings() {
      this.settingsOpen = true;
      this.haptic("light");
    },
    closeSettings() {
      this.settingsOpen = false;
      this.haptic("light");
    },
    openClearBoardConfirm() {
      this.clearBoardConfirmOpen = true;
      this.haptic("light");
    },
    closeClearBoardConfirm() {
      this.clearBoardConfirmOpen = false;
      this.haptic("light");
    },
    clear() {
      const board = this.boards.find(
        (board) => board.id === this.activeBoard.id
      );

      if (board) {
        board.notes = [];
      }

      this.save();
      this.haptic("warning");
      this.clearBoardConfirmOpen = false;
    },
    newBoard() {
      const board = getNewBoard();

      this.boards.push(board);

      this.config.activeBoardID = board.id;
      this.save();
      this.haptic("success");
    },
    deleteBoard(boardId: string) {
      this.boards = this.boards.filter((board) => board.id !== boardId);

      this.save();

      if (boardId === this.activeBoard.id) {
        this.config.activeBoardID = this.boards[0].id;
      }
      this.haptic("rigid");
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
          zIndex: this.config.topZIndex + 1,
        };
        this.config.topZIndex = note.zIndex || this.config.topZIndex;
        board.notes.push(note);
      }

      this.save();
      this.haptic("light");
    },
    moveNote(id: string, movement: { x: number; y: number }) {
      const board = this.boards.find(
        (board) => board.id === this.activeBoard.id
      );

      if (board) {
        const note = board.notes.find((note) => note.id === id);

        if (note) {
          note.coords = {
            x: note.coords.x + movement.x,
            y: note.coords.y + movement.y,
          };
        }
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
      this.haptic("rigid");
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
          this.haptic(note.loved ? "success" : "selection");
        }
      }
      this.save();
    },
    cycleNoteColor(id: string) {
      const board = this.boards.find(
        (board) => board.id === this.activeBoard.id
      );

      if (board) {
        const note = board.notes.find((note) => note.id === id);

        if (note) {
          note.color = getNextColor(note.color);
        }
      }

      this.save();
      this.haptic("selection");
    },
    panCanvas(delta: { x: number; y: number }) {
      this.config.offset = {
        x: this.config.offset.x - delta.x,
        y: this.config.offset.y - delta.y,
      };

      this.save();
    },
    setFocusFavorites(value?: boolean) {
      this.config.focusFavorites =
        typeof value === "boolean" ? value : !this.config.focusFavorites;

      this.save();
      this.haptic("selection");
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

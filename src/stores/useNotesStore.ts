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

export type Note = {
  id: string;
  content: string;
  dateAdded: Date;
  coords: {
    x: number;
    y: number;
  };
  color: string;
};

const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: [
      {
        id: "1",
        content:
          "How to 😎\n\n - Click anywhere to add a new note. \n - Hover on each note to show options. \n - You can also create other boards by clicking the + icon on the top-right corner of this board. ",
        dateAdded: new Date(),
        coords: {
          x: 50,
          y: 50,
        },
      },
    ] as Note[],
  }),
  actions: {
    newNote(coords: { x: number; y: number }) {
      const note: Note = {
        id: uuid(),
        content: "",
        dateAdded: new Date(),
        coords,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      this.notes.push(note);
    },
    deleteNote(id: string) {
      this.notes = this.notes.filter((note) => note.id === id);
    },
    updateNoteContent(id: string, newContent: string) {
      // do nothing
    },
  },
});

export default useNotesStore;

export type BookStatus = "to-read" | "reading" | "finished";

export type Book = {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  rating: number;
  coverUrl: string;
  note?: string;
  addedAt: string;
  updatedAt: string;
};

export const statusLabels: Record<BookStatus, string> = {
  "to-read": "To read",
  reading: "Reading",
  finished: "Finished",
};

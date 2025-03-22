export type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateNoteDto = {
  title: string;
  content: string;
  email: string;
}

export type UpdateNoteDto = {
  title?: string;
  content?: string;
}

export interface NoteFilters {
  search?: string;
  startDate?: Date;
  endDate?: Date;
}

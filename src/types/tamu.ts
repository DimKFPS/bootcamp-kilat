export type Tamu = {
  id: number;
  name: string;
  no_hp: string;
  status_hadir: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTamuDto = {
  name: string;
  no_hp: string;
  status_hadir: boolean;
  email: string;
};

export type UpdateTamuDto = {
  name?: string;
  no_hp?: string;
  status_hadir?: boolean;
};

export type TamuFilters = {
  search?: string;
  startDate?: Date;
  endDate?: Date;
  status_hadir: boolean | undefined;
};

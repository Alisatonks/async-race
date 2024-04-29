export type Car = {
  name: string;
  color: string;
  id: number;
};

export type CreatingCar = Pick<Car, 'name' | 'color'>;

export type Cars = Car[];

export enum EngineStatus {
  Started = 'started',
  Stopped = 'stopped',
  Drive = 'drive',
}

export enum SortBy {
  time = 'time',
  wins = 'wins',
}

export enum SortingOrder {
  asc = 'ASC',
  decr = 'DESC',
}

export type VelocityDistance = {
  velocity: number;
  distance: number;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type Finisher = {
  id: number;
  time: number;
  color: string;
  name: string;
};

export type WinnerRecord = Pick<Winner, 'wins' | 'time'>;

export type WinnersReducer = {
  [key: number]: WinnerRecord;
};

export type SortingParams = {
  sortBy?: SortBy;
  order?: SortingOrder;
};

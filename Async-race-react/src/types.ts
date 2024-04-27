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
  name: string;
  time: number;
};

export type WinnerRecord = Pick<Winner, 'wins' | 'time'>;

export type WinnersReducer = {
  [key: number]: WinnerRecord;
};

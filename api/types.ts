export type PrimaryLiftName =
  | "Back Squat"
  | "Deadlifts"
  | "Overhead Press"
  | "Bench Press"
  | "Dips";

interface Set {
  weight: number;
  minReps: number;
}

interface PrimarySet extends Set {
  percentage: number;
  maxReps?: number | "max";
}

type RepScheme<T = PrimarySet | Set> = Array<T>;

export type TrainingMax = {
  exercise: PrimaryLiftName;
  weight: number;
};

export type PrimaryExerciseBlock = {
  exercise: PrimaryLiftName;
  trainingMax: number;
  weekOne: RepScheme<PrimarySet>;
  weekTwo: RepScheme<PrimarySet>;
  weekThree: RepScheme<PrimarySet>;
  deload: RepScheme<PrimarySet>;
};

export type AccessoryExerciseBlock = {
  exercise: string;
  weekOne: RepScheme<Set>;
  weekTwo: RepScheme<Set>;
  weekThree: RepScheme<Set>;
  deload: RepScheme<Set>;
};

export type TrainingBlock = {
  primary: PrimaryExerciseBlock[];
  accessory?: AccessoryExerciseBlock[];
};

export interface iUser {
  readonly username: string;
  readonly email: string;
  readonly isAdmin: boolean;
  readonly joinDate: Date;
  readonly trainingBlock?: TrainingBlock;
}

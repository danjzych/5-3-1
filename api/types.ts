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
  percentage?: number;
  maxReps?: number | "max";
}

type RepScheme = Array<PrimarySet | Set>;

export type TrainingMax = {
  exercise: PrimaryLiftName;
  weight: number;
};

//TODO: will eventually expand to have blocks for primary and non primary lists
export type ExerciseBlock = {
  trainingMax?: number;
  weekOne: RepScheme;
  weekTwo: RepScheme;
  weekThree: RepScheme;
  deload: RepScheme;
};

export type TrainingBlock = Record<PrimaryLiftName, ExerciseBlock>;

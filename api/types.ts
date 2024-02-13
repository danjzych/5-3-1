interface Set {
  weight: number;
  minReps: number;
}

interface PrimarySet extends Set {
  percentage?: number;
  maxReps?: number | "max";
}

type RepScheme = Array<PrimarySet | Set>;

export type TrainingBlock = {
  weekOne: RepScheme;
  weekTwo: RepScheme;
  weekThree: RepScheme;
  deload: RepScheme;
};

export interface iLift {
  readonly _name: string;
}

export interface iPrimaryLift extends iLift {
  readonly trainingMax: number;
}

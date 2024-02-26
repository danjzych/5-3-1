import type { TrainingBlock } from "../types";

abstract class Lift {
  protected _exercise: string;
  constructor(exercise: string) {
    this._exercise = exercise;
  }
  abstract get trainingBlock(): TrainingBlock;
}

export class PrimaryLift extends Lift {
  #trainingMax: number;

  constructor(name: string, trainingMax: number) {
    super(name);
    this.#trainingMax = trainingMax;
  }

  get exercise() {
    return this._exercise;
  }

  get trainingMax() {
    return this.#trainingMax;
  }

  get trainingBlock(): TrainingBlock {
    return {
      exercise: this._exercise,
      trainingMax: this.trainingMax,
      weekOne: [
        { percentage: 0.65, weight: this.#trainingMax * 0.65, minReps: 5 },
        { percentage: 0.75, weight: this.#trainingMax * 0.75, minReps: 5 },
        {
          percentage: 0.85,
          weight: this.#trainingMax * 0.85,
          minReps: 5,
          maxReps: "max",
        },
      ],
      weekTwo: [
        { percentage: 0.7, weight: this.#trainingMax * 0.7, minReps: 3 },
        { percentage: 0.8, weight: this.#trainingMax * 0.8, minReps: 3 },
        {
          percentage: 0.9,
          weight: this.#trainingMax * 0.9,
          minReps: 3,
          maxReps: "max",
        },
      ],
      weekThree: [
        { percentage: 0.75, weight: this.#trainingMax * 0.75, minReps: 5 },
        { percentage: 0.85, weight: this.#trainingMax * 0.85, minReps: 3 },
        {
          percentage: 0.95,
          weight: this.#trainingMax * 0.95,
          minReps: 1,
          maxReps: "max",
        },
      ],
      deload: [
        { percentage: 0.4, weight: this.#trainingMax * 0.4, minReps: 5 },
        { percentage: 0.5, weight: this.#trainingMax * 0.5, minReps: 5 },
        {
          percentage: 0.6,
          weight: this.#trainingMax * 0.6,
          minReps: 5,
        },
      ],
    };
  }
}

export class AccessoryLift extends Lift {
  #weights: number[];

  constructor(name: string, weights: number[]) {
    super(name);
    this.#weights = weights;
  }

  get exercise() {
    return this._exercise;
  }

  get weights() {
    return this.#weights;
  }

  get trainingBlock(): TrainingBlock {
    return {
      exercise: this.exercise,
      weekOne: this.#weights.map((weight) => ({ weight, minReps: 8 })),
      weekTwo: this.#weights.map((weight) => ({ weight, minReps: 8 })),
      weekThree: this.#weights.map((weight) => ({ weight, minReps: 8 })),
      deload: this.#weights.map((weight) => ({
        weight: weight * 0.8,
        minReps: 12,
      })),
    };
  }
}

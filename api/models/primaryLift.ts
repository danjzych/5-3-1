import type { iPrimaryLift } from "../types";

class PrimaryLift implements iPrimaryLift {
  #name: string;
  #trainingMax: number;

  constructor(name: string, trainingMax: number) {
    this.#name = name;
    this.#trainingMax = trainingMax;
  }

  get name() {
    return this.#name;
  }

  get trainingMax() {
    return this.#trainingMax;
  }

  get trainingBlock() {
    return null;
  }
}

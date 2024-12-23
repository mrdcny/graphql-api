export interface IAxie {
  id: number;
  name: string;
  stage: string;
  class: string;
  currentPriceUsd: number;
}

export interface IAxieGroup {
  [key: string]: IAxie[];
}

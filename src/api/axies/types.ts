export interface IAxie {
  id: number;
  name: string;
  stage: string;
  class: string;
  currentPriceUsd: number;
}

export interface AxieTypeDef {
  id: number;
  name: string;
  stage: string;
  class: string;
  order: { currentPriceUsd: number };
}

export interface ITotalSupply {
  totalSupply: number;
}

export interface IAxieGroup {
  [key: string]: IAxie[];
}

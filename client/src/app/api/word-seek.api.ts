export interface WordSeekAPI {
  word:       string;
  solution: Resolution[];
}

export interface Resolution {
  location: LocationElement[];
  letter:   string;
}

export interface LocationElement {
  location:    LocationRC;
  uuid:        null | string;
  uuidParent?: null | string;
}

export interface LocationRC {
  row: number;
  col: number;
}

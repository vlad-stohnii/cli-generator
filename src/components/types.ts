export type ConsoleObjects = Array<ConsoleObjectType>;

export type ConsoleObjectType = Input | Output| Frames;
export interface Input {
  input: string;
  timing: number;
}
export interface Output {
  output: string;
  timing: number;
}
export interface Frames {
  frames: Frame[];
}
export interface Frame {
  value: string;
  style?: string[];
  timing: number;
}
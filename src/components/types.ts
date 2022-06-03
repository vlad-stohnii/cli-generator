export type Data = DataObject[]

export interface DataObject {
  object: Text,
  timing: number | null
}

export type Text = string | Frame[];

export interface Frame {
  frame: string[],
  timing: number | null
}
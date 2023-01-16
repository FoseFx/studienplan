export enum ModuleArea {
  Praktische,
  Technische,
  Mathe,
  Theoretische,
  Sonstiges,
  Wahl,
}

export interface Module {
  id: number;
  title: string;
  credits: number;
  ws: boolean;
  ss: boolean;
  area: ModuleArea;
}

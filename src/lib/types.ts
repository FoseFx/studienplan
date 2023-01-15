export enum ModuleArea {
  Praktische,
  Technische,
  Theoretische,
  Mathe,
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

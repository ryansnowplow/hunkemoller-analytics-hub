export interface ModelArea {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  connection: string;
  dataset: string;
  cache?: string;
  dashboardCount: number;
  viewCount: number;
  dashboards: Dashboard[];
  views: View[];
  explores?: Explore[];
}

export interface Dashboard {
  id: string;
  name: string;
  purpose: string;
  filters: Filter[];
  exploreName?: string;
  tiles: Tile[];
  howToRead?: string;
}

export interface Filter {
  name: string;
  default?: string;
}

export interface Tile {
  name: string;
  type: 'kpi' | 'line' | 'bar' | 'pie' | 'table' | 'map' | 'area' | 'column' | 'funnel';
  description: string;
  calculation: string;
}

export interface View {
  id: string;
  name: string;
  displayName: string;
  sourceTable: string;
  description: string;
  dimensions: Field[];
  measures: Field[];
}

export interface Field {
  name: string;
  displayName: string;
  type: 'dimension' | 'measure';
  fieldType?: string;
  description: string;
  sql?: string;
}

export interface Explore {
  name: string;
  description: string;
  joins?: string;
}

export interface ChartType {
  id: string;
  name: string;
  icon: string;
  bestFor: string;
  whenToUse: string;
  whenNotToUse: string;
  lookerSteps: string[];
  configYaml: string;
  requiresConfigEditor?: boolean;
  realExample: {
    dashboard: string;
    description: string;
  };
}

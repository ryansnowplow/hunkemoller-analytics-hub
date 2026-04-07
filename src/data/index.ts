export type {
  ModelArea,
  Dashboard,
  Filter,
  Tile,
  View,
  Field,
  Explore,
  ChartType,
} from './types';

export { unifiedModel } from './unified';
export { ecommerceModel } from './ecommerce';
export { attributionModel } from './attribution';
export { chartTypes } from './charts';

import { unifiedModel } from './unified';
import { ecommerceModel } from './ecommerce';
import { attributionModel } from './attribution';
import type { ModelArea } from './types';

export const modelAreas: ModelArea[] = [
  unifiedModel,
  ecommerceModel,
  attributionModel,
];

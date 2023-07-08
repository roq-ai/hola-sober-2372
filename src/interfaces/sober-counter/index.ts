import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SoberCounterInterface {
  id?: string;
  days_sober: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface SoberCounterGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}

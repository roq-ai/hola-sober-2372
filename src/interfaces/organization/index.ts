import { EventInterface } from 'interfaces/event';
import { MeetingInterface } from 'interfaces/meeting';
import { SongInterface } from 'interfaces/song';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  event?: EventInterface[];
  meeting?: MeetingInterface[];
  song?: SongInterface[];
  user?: UserInterface;
  _count?: {
    event?: number;
    meeting?: number;
    song?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}

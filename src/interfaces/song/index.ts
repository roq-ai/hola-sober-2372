import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface SongInterface {
  id?: string;
  title: string;
  artist: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface SongGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  artist?: string;
  organization_id?: string;
}

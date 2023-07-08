import axios from 'axios';
import queryString from 'query-string';
import { SoberCounterInterface, SoberCounterGetQueryInterface } from 'interfaces/sober-counter';
import { GetQueryInterface } from '../../interfaces';

export const getSoberCounters = async (query?: SoberCounterGetQueryInterface) => {
  const response = await axios.get(`/api/sober-counters${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSoberCounter = async (soberCounter: SoberCounterInterface) => {
  const response = await axios.post('/api/sober-counters', soberCounter);
  return response.data;
};

export const updateSoberCounterById = async (id: string, soberCounter: SoberCounterInterface) => {
  const response = await axios.put(`/api/sober-counters/${id}`, soberCounter);
  return response.data;
};

export const getSoberCounterById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sober-counters/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSoberCounterById = async (id: string) => {
  const response = await axios.delete(`/api/sober-counters/${id}`);
  return response.data;
};

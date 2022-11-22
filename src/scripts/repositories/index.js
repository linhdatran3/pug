import api from '@/repositories/api';

export function getSample() {
  return api.get('/data/sample.json');
}

export function postSample() {
  return api.post('/data/sample2.json');
}

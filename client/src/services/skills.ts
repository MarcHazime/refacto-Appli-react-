import API from './APIClient';

export async function getAllSkills() {
  return API.get('/skills').then((res) => res.data);
}

export async function createSkill({name}: {name: string}) {
  return API.post('/skills', {name});
}

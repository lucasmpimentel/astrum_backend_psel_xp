import axios from 'axios';

const baseUrl = 'https://api-cotacao-b3.labdo.it';

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
});

const searchAll = async () => {
  const result = await instance
    .get('/api/empresa')
    .then((resp) => resp.data)
    .catch((err) => err.message);
  return result;
};

const searchByName = async (cod: string) => {
  const result = await instance
    .get(`/api/cotacao/cd_acao/${cod}`)
    .then((resp) => resp.data)
    .catch((err) => err.message);
  return result;
};

export default {
  searchAll,
  searchByName,
};

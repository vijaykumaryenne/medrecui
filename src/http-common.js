import axios from 'axios';
export const HTTP = axios.create({
  baseURL: `https://medrec-gse00010209.apaas.em2.oraclecloud.com`,
  headers: {
    'accept': 'application/json',
  }
})
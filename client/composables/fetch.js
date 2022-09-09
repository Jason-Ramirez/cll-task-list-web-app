
import appConfig from '../config/app';
import { getAuthHeaders } from './auth';

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

export const $post = async (url, body) => {
  const jsonString = JSON.stringify(body);
  const response = await fetch(appConfig.api_url + url, {
    body: jsonString,
    method: 'POST',
    headers: { ...defaultHeaders, ...getAuthHeaders(), },
  });
  if (response.status == 200) return response.json();
  return response;  
}

export const $get = async (url) => {
  const response = await fetch(appConfig.api_url + url, {
    method: 'GET',
    headers: { ...defaultHeaders, ...getAuthHeaders(), },
  });
  if (response.status == 200) return response.json();
  return response;  
}
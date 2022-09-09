import Cookies from 'js-cookie';

export const setAuthToken = (token) => Cookies.set('LOGIN-TOKEN', token);
export const getAuthToken = () => Cookies.get('LOGIN-TOKEN');
export const getAuthHeaders = () => {
  const authToken = getAuthToken();
  if (!authToken) return {};
  return { authorization: `Bearer ${authToken}` };
}
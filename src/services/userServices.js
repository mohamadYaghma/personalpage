import httpService from './httpService';

export const searchUsers = async (query) => {
  const { data } = await httpService.get(`/admin/users?search=${query}`);
  return data;
};

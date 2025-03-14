import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const fetchUsers = async (page: number, search: string): Promise<User[]> => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users', {
    params: {
      _limit: 10,
      _page: page,
      q: search,
    },
  });
  return data;
};

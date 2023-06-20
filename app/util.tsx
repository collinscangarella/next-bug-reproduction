import { cookies } from 'next/headers';

export const graphqlFetch = (query: String, variables?: any) => fetch('http://localhost:3000/api/graphql/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'cookies': cookies().toString(),
  },
  body: JSON.stringify({query, variables}),
}).then(res => res.json())
  .then((res) => {
    if (res.errors) {
      console.log(JSON.stringify(res));
      throw new Error(JSON.stringify(res.errors));
    }
    return res.data;
  });

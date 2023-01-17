// @ts-nocheck

const fetcher = async (url, token, method = 'GET') => {
  console.log(token);
  if (!token) return;
  const res = await fetch(url, {
    method,
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  });

  if (res.ok) {
    return res.json();
  }
  console.log(res.statusText);
  // throw new Error(res.statusText);
};

export default fetcher;

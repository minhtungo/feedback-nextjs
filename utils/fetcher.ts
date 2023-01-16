// @ts-nocheck

const fetcher = async (url, token) => {
  if (!token) return;
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  });

  if (res.ok) {
    return res.json();
  }
  throw new Error(res.statusText);
};

export default fetcher;

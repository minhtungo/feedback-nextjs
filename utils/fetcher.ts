// @ts-nocheck

const fetcher = async (...args: any) => {
  const res = await fetch(...args);
  if (res.ok) {
    return res.json();
  }
  throw new Error(res.statusText);
};

export default fetcher;

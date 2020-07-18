export const fetcher = async (url) => {
  const r = await fetch(url);
  return await r.json();
};

export const fetcher = async (url) => {
  const r = await fetch(url);
  if (r.ok) {
    return await r.json();
  } else {
    const error = await r.text();
    throw error;
  }
};

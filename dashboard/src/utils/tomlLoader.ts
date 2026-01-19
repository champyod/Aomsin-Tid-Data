import { parse } from 'smol-toml';

export const fetchToml = async (path: string) => {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to fetch TOML file at ${path}`);
  }
  const text = await res.text();
  return parse(text);
};

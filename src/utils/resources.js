import { DEFAULT_RESOURCES } from "../data/resources";

const RESOURCES_KEY = "emocheck_resources";

export function getResources() {
  try {
    const stored = JSON.parse(localStorage.getItem(RESOURCES_KEY));
    if (Array.isArray(stored)) return stored;
  } catch {
    // fall through to defaults
  }
  localStorage.setItem(RESOURCES_KEY, JSON.stringify(DEFAULT_RESOURCES));
  return DEFAULT_RESOURCES;
}

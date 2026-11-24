import { DEFAULT_RESOURCES } from "../data/resources";

const RESOURCES_KEY = "emocheck_resources";

function save(list) {
  localStorage.setItem(RESOURCES_KEY, JSON.stringify(list));
  return list;
}

export function getResources() {
  try {
    const stored = JSON.parse(localStorage.getItem(RESOURCES_KEY));
    if (Array.isArray(stored)) return stored;
  } catch {
    // fall through to defaults
  }
  return save(DEFAULT_RESOURCES);
}

export function addResource(data) {
  return save([...getResources(), { ...data, id: crypto.randomUUID() }]);
}

export function updateResource(id, data) {
  return save(getResources().map((r) => (r.id === id ? { ...r, ...data } : r)));
}

export function deleteResource(id) {
  return save(getResources().filter((r) => r.id !== id));
}

export function resetResources() {
  return save(DEFAULT_RESOURCES);
}

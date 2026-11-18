const DEVICE_KEY = "emocheck_device_id";
const CHECKINS_KEY = "emocheck_checkins";

export function getDeviceId() {
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

export function getCheckIns() {
  try {
    return JSON.parse(localStorage.getItem(CHECKINS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveCheckIn({ mood, tags, reflection }) {
  const entry = {
    id: crypto.randomUUID(),
    deviceId: getDeviceId(),
    mood,
    tags,
    reflection,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(CHECKINS_KEY, JSON.stringify([entry, ...getCheckIns()]));
  return entry;
}

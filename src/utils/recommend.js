import { getCheckIns } from "./storage";
import { getResources } from "./resources";

export function getRecommendations() {
  const checkIns = getCheckIns();
  if (checkIns.length === 0) return { level: "none", resources: [] };

  const latest = checkIns[0];
  const recent = checkIns.slice(0, 3);
  const average = recent.reduce((sum, c) => sum + c.mood, 0) / recent.length;
  const all = getResources();

  if (latest.mood <= 2 || average <= 2.5) {
    return {
      level: "distress",
      resources: all.filter((r) => r.category === "Crisis" || r.category === "Hospital"),
    };
  }
  if (latest.mood === 3) {
    return {
      level: "support",
      resources: all.filter((r) => r.category === "Counselling" || r.category === "Community"),
    };
  }
  return { level: "none", resources: [] };
}

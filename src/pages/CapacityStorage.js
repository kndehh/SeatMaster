// src/utils/capacityStore.js
const capacityMap = {};

export function getRouteKey(start, end) {
  if (!start || !end || start === end) return null;
  return [start, end].sort().join("-");
}

export function getCapacity(start, end) {
  const key = getRouteKey(start, end);
  if (!key) return { used: 0, total: 100 };
  if (!capacityMap[key]) {
    // Generate and store random capacity if not present
    capacityMap[key] = { used: Math.floor(Math.random() * 70) + 10, total: 100 };
  }
  return capacityMap[key];
}

export function setCapacity(start, end, used) {
  const key = getRouteKey(start, end);
  if (!key) return;
  if (!capacityMap[key]) {
    capacityMap[key] = { used, total: 100 };
  } else {
    capacityMap[key].used = used;
  }
}
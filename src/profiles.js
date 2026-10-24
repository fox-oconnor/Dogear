const REGISTRY_KEY = 'dogear-profiles';

function loadRegistry() {
  try {
    const raw = localStorage.getItem(REGISTRY_KEY);
    if (!raw) return { profiles: [], activeId: null };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.profiles)) return { profiles: [], activeId: null };
    return parsed;
  } catch {
    return { profiles: [], activeId: null };
  }
}

function saveRegistry(registry) {
  localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
}

function listProfiles() {
  return loadRegistry().profiles;
}

function getActiveProfile() {
  const registry = loadRegistry();
  return registry.profiles.find((p) => p.id === registry.activeId) || null;
}

function createProfile(name) {
  const registry = loadRegistry();
  const profile = {
    id: crypto.randomUUID(),
    name: name.trim(),
    createdAt: new Date().toISOString(),
    locked: false,
  };
  registry.profiles.push(profile);
  registry.activeId = profile.id;
  saveRegistry(registry);
  return profile;
}

function switchProfile(id) {
  const registry = loadRegistry();
  if (!registry.profiles.some((p) => p.id === id)) return false;
  registry.activeId = id;
  saveRegistry(registry);
  return true;
}

function deleteProfile(id) {
  const registry = loadRegistry();
  registry.profiles = registry.profiles.filter((p) => p.id !== id);
  if (registry.activeId === id) {
    registry.activeId = registry.profiles.length > 0 ? registry.profiles[0].id : null;
  }
  saveRegistry(registry);
  return true;
}

function migrateLegacyData(name) {
  const registry = loadRegistry();
  if (registry.profiles.length > 0) return;
  const legacyReading = localStorage.getItem('dogear-reading-list');
  const legacyWishlist = localStorage.getItem('dogear-wishlist');
  const profile = createProfile(name);
  if (legacyReading) {
    localStorage.setItem(`dogear:${profile.id}:reading-list`, legacyReading);
  }
  if (legacyWishlist) {
    localStorage.setItem(`dogear:${profile.id}:wishlist`, legacyWishlist);
  }
}


export { listProfiles, getActiveProfile, createProfile, switchProfile, deleteProfile, migrateLegacyData };

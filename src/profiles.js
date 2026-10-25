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

function createProfile(name, bio = '', location = '') {
  const registry = loadRegistry();
  const profile = {
    id: crypto.randomUUID(),
    name: name.trim(),
    bio: bio.trim(),
    location: location.trim(),
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
  localStorage.removeItem(`dogear:${id}:reading-list`);
  localStorage.removeItem(`dogear:${id}:wishlist`);
  return true;
}

function renameProfile(id, newName) {
  const trimmed = newName.trim();
  if (!trimmed) return false;
  const registry = loadRegistry();
  const profile = registry.profiles.find((p) => p.id === id);
  if (!profile) return false;
  profile.name = trimmed;
  saveRegistry(registry);
  return true;
}

function updateProfile(id, updates) {
  const registry = loadRegistry();
  const profile = registry.profiles.find((p) => p.id === id);
  if (!profile) return false;
  if (updates.name !== undefined) {
    const trimmed = updates.name.trim();
    if (!trimmed) return false;
    profile.name = trimmed;
  }
  if (updates.bio !== undefined) {
    profile.bio = updates.bio.trim();
  }
  if (updates.location !== undefined) {
    profile.location = updates.location.trim();
  }
  saveRegistry(registry);
  return true;
}

function migrateLegacyData(name, bio = '', location = '') {
  const registry = loadRegistry();
  if (registry.profiles.length > 0) return;
  const legacyReading = localStorage.getItem('dogear-reading-list');
  const legacyWishlist = localStorage.getItem('dogear-wishlist');
  const profile = createProfile(name, bio, location);
  if (legacyReading) {
    localStorage.setItem(`dogear:${profile.id}:reading-list`, legacyReading);
  }
  if (legacyWishlist) {
    localStorage.setItem(`dogear:${profile.id}:wishlist`, legacyWishlist);
  }
}


export { listProfiles, getActiveProfile, createProfile, switchProfile, deleteProfile, renameProfile, updateProfile, migrateLegacyData };

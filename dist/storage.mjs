import { validateAssignment } from './model.mjs';
export const STORAGE_KEY = 'pmp3.student-planner.v1';
export function loadAssignments(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw === null) return { items: [], writable: true, warning: '' };
    const saved = JSON.parse(raw);
    if (saved.version !== 1 || !Array.isArray(saved.items)) throw new Error('Unsupported saved data');
    const ids = new Set();
    const items = saved.items.map(item => {
      if (!item || typeof item.id !== 'string' || !/^[a-zA-Z0-9-]{1,80}$/.test(item.id) || ids.has(item.id) || typeof item.completed !== 'boolean' || typeof item.title !== 'string' || typeof item.course !== 'string' || typeof item.due !== 'string') throw new Error('Invalid saved item');
      const checked = validateAssignment(item);
      if (!checked.valid) throw new Error('Invalid saved assignment');
      ids.add(item.id);
      return { ...checked.value, id: item.id, completed: item.completed };
    });
    return { items, writable: true, warning: '' };
  } catch {
    return { items: [], writable: false, warning: 'Your saved list could not be loaded. Existing saved data has been left untouched. You can use a temporary list in this tab, but it will clear on refresh.' };
  }
}
export function saveAssignments(storage, items) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, items }));
    return { saved: true, warning: '' };
  } catch {
    return { saved: false, warning: 'This browser could not save your latest changes. They remain in this tab, but may be lost on refresh. Copy any important details before closing.' };
  }
}

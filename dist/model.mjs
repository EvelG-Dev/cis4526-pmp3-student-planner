export function validateAssignment(input) {
  const title = String(input.title ?? '').trim();
  const course = String(input.course ?? '').trim();
  const due = String(input.due ?? '');
  const errors = {};
  if (!title) errors.title = 'Enter an assignment title.';
  else if (title.length > 120) errors.title = 'Use 120 characters or fewer.';
  if (!course) errors.course = 'Enter a course name.';
  else if (course.length > 60) errors.course = 'Use 60 characters or fewer.';
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(due);
  if (!parts) errors.due = 'Choose a valid due date.';
  else {
    const [year, month, day] = parts.slice(1).map(Number);
    const date = new Date(0);
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCFullYear(year, month - 1, day);
    if (year < 1 || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) errors.due = 'Choose a valid due date.';
  }
  return { valid: Object.keys(errors).length === 0, errors, value: { title, course, due } };
}

export function sortAssignments(items) {
  return [...items].sort((a, b) => a.due.localeCompare(b.due) || a.title.localeCompare(b.title));
}

export function setCompleted(items, id, completed) {
  return items.map(item => item.id === id ? { ...item, completed: Boolean(completed) } : item);
}

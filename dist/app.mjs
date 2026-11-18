import { validateAssignment, sortAssignments, setCompleted } from './model.mjs';
import { loadAssignments, saveAssignments } from './storage.mjs';
const form = document.querySelector('#assignment-form');
const list = document.querySelector('#assignments');
const warning = document.querySelector('#storage-warning');
const announce = document.querySelector('#announcement');
let storage;
try { storage = window.localStorage; } catch { storage = null; }
const loaded = loadAssignments(storage);
let assignments = loaded.items;
function showWarning(message) {
  warning.textContent = message;
  warning.hidden = !message;
}
showWarning(loaded.warning);
function persist() {
  if (loaded.writable) showWarning(saveAssignments(storage, assignments).warning);
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const result = validateAssignment(Object.fromEntries(new FormData(form)));
  for (const key of ['title', 'course', 'due']) {
    form.elements[key].setAttribute('aria-invalid', String(Boolean(result.errors[key])));
    document.getElementById(`${key}-error`).textContent = result.errors[key] || '';
  }
  if (!result.valid) {
    form.elements[Object.keys(result.errors)[0]].focus();
    return;
  }
  assignments.push({ ...result.value, id: crypto.randomUUID(), completed: false });
  persist(); render();
  announce.textContent = `${result.value.title} added.`;
  form.reset(); form.elements.title.focus();
});
function render() {
  list.replaceChildren(...sortAssignments(assignments).map(item => {
    const row = document.createElement('li'); row.className = `assignment${item.completed ? ' is-complete' : ''}`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; checkbox.id = `done-${item.id}`; checkbox.checked = item.completed;
    checkbox.setAttribute('aria-label', `Mark ${item.title} ${item.completed ? 'incomplete' : 'complete'}`);
    checkbox.addEventListener('change', () => {
      assignments = setCompleted(assignments, item.id, checkbox.checked);
      persist(); render();
      document.getElementById(`done-${item.id}`).focus();
      const changed = assignments.find(a => a.id === item.id);
      announce.textContent = `${item.title} marked ${changed.completed ? 'complete' : 'incomplete'}.`;
    });
    const description = document.createElement('div'); description.className = 'assignment-description';
    const course = document.createElement('span'); course.className = 'course'; course.textContent = item.course;
    const title = document.createElement('h3'); title.textContent = item.title;
    const status = document.createElement('span'); status.className = 'completion-status'; status.textContent = item.completed ? 'Completed' : 'To do';
    const date = document.createElement('time'); date.dateTime = item.due;
    const [y,m,d] = item.due.split('-').map(Number);
    const local = new Date(0); local.setFullYear(y,m-1,d); local.setHours(12,0,0,0);
    date.textContent = local.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
    description.append(course,title,status); row.append(checkbox,description,date); return row;
  }));
  document.querySelector('#empty').hidden = assignments.length !== 0;
  const open = assignments.filter(item => !item.completed).length;
  document.querySelector('#count').textContent = `${open} to do · ${assignments.length - open} completed`;
}
render();

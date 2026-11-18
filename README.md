# Student deadline planner

Local implementation draft for Evel's CIS4526 PMP3 work. Team review, backlog ID, story points, sprint assignment and acceptance remain pending. This work does not establish a completed sprint.

The implementation draft adds assignments with a title, course and valid due date, orders entries by deadline, marks work complete or incomplete, and saves the list in the same browser. The team still needs to review and accept the scope and map it to the canonical backlog.

Browser storage is local to one device and browser profile. Clearing site data removes the list. There is no university login, Canvas integration or cloud sync. Restricted storage produces a visible warning. Corrupt saved data is left untouched and the app offers a temporary list instead of overwriting it.

## Run locally

Requires Node.js 22 or later. No installation or third-party packages are needed.

1. Open a terminal in this folder.
2. Run `npm test`.
3. Run `npm start` and open `http://127.0.0.1:4173`.

## Proposed acceptance checks

- Blank or whitespace-only title/course and missing or impossible dates show a field-specific error and add no record.
- Valid entries display the trimmed title, course and due date.
- Adding an earlier deadline moves it above later deadlines.
- User-entered markup displays as text.
- Keyboard users can enter and submit data and reach the first invalid field.
- Assignments and completion status survive refresh in the same browser.
- Marking an item complete updates its text and counts; marking it incomplete reverses that change.
- Storage load/write failures produce a visible warning, and unreadable saved data is not overwritten.

These checks are implementation proposals for Tamid and Carlos to review. Automated results in the handoff are developer checks, separate from Carlos's eventual acceptance testing.

## GitHub handoff

Copy the **contents of this folder** to the repository root. The workflow expects `dist`, `tests` and `package.json` at that root. Enable Pages with the GitHub Actions source, then push `main`. The workflow tests before uploading and deploying. The local repository contains a preparation commit once initialized. No hosted repository, deployment or successful remote Actions run is claimed by this draft.

For evidence, link the approved story ID to the commit, workflow run, live Pages URL and actual acceptance results. The supplied workflow uses official GitHub actions but has not run remotely yet.

Workflow reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Verification on November 18

Ten automated developer tests pass, covering validation, date ordering, completion, storage round trips, malformed data, duplicate identities and storage failures. Browser checks cover field errors, creation, ordering, saved data after refresh, completion and reopening. These checks are separate from Carlos's acceptance testing and do not establish a completed sprint.

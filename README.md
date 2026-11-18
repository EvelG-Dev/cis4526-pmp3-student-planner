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

## GitHub repository and checks

Repository: https://github.com/EvelG-Dev/cis4526-pmp3-student-planner

The planner source and tests are uploaded. The Planner checks workflow runs on pushes and pull requests. A successful remote run was verified on November 18: https://github.com/EvelG-Dev/cis4526-pmp3-student-planner/actions/runs/44273286466

Live demo: https://evelg-dev.github.io/cis4526-pmp3-student-planner/

Successful Pages deployment verified November 18: https://github.com/EvelG-Dev/cis4526-pmp3-student-planner/actions/runs/44274600018

The repository is public with Evel's explicit approval. Pages uses GitHub Actions and deploys `dist` after passing tests. The deployment guard prevents accidental publication if repository visibility later becomes private. Workflows run with Node.js 22 on Ubuntu 24.04 using the current setup-node action.

For final evidence, link the reviewed story ID to the meaningful commit, successful run, live Pages URL and actual team acceptance results. Canonical story IDs and sprint acceptance still require team review. A successful CI run is evidence of automated tests, not a deployment or completed sprint.

Workflow reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Verification on November 18

Ten automated developer tests pass, covering validation, date ordering, completion, storage round trips, malformed data, duplicate identities and storage failures. Browser checks cover field errors, creation, ordering, saved data after refresh, completion and reopening. These checks are separate from Carlos's acceptance testing and do not establish a completed sprint.

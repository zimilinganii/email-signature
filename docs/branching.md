# Branching and releases

## Strategy

- main: production-ready source, tests, workflows and documentation. Only approved releases/hotfixes belong here.
- develop: integration branch for ongoing work. These platform/manual changes start here.
- feature/<description>, fix/<description>, docs/<description>: short-lived branches made from develop.
- hotfix/<description>: urgent production correction from main, reviewed into main and then merged back into develop.

The user's website repository strategy was not available for inspection; this is an explicit develop/main strategy, not a claim to have copied that repository's exact rules.

## Normal work

```sh
git switch develop
git pull --ff-only
git switch -c feature/example
# implement, test, commit
git push -u origin feature/example
```

Open a PR into develop. After integration and testing, open a release PR from develop to main. Do not merge until the user approves production release. Production is unchanged while work remains on develop.

## Checks and deployment

Check changes CI runs unit tests, a production build and browser tests for develop/feature/fix/docs pushes and PRs into main/develop. Pages deploys main only; its job also guards against manually dispatching from another branch. Workflow changes on develop do not affect main until merged.

Recommended repository rule: require PRs, the verify check, and at least one approval for main; disallow force pushes/deletions. These are recommendations, not configured branch protections. They require repository settings access and plan support.

Keep docs and tests with production source; “production only” means reviewed releases, not deleting supporting files. Revert faulty releases through a reviewed revert commit; never reset shared history.


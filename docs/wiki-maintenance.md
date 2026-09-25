# Wiki maintenance

docs/ is the permanent source of truth. The GitHub Wiki is a separate Git repository; it is not automatically updated by app deployment.

## One-time prerequisite

Enable Wiki in repository Settings → General → Features, then open the Wiki tab and create/save its first page. If Git reports Repository not found, check that initialization, account permissions and repository-plan availability. Do not change repository visibility merely to run this script.

## Publish

```sh
node scripts/publish-wiki.mjs --prepare-only  # prepare and inspect without publishing
node scripts/publish-wiki.mjs
```

The script clones the existing Wiki into an OS temporary folder, mirrors documentation as named pages, translates relative Markdown page links, generates Home and a sidebar, commits only changes, and pushes the Wiki's current branch. It does not delete unrelated pages. Existing pages with the same generated names are intentionally updated. Review docs before publishing; ordinary app builds never run this script.

The script is idempotent and requires Git credentials with Wiki write access. If clone/push fails it exits nonzero and reports the retained temporary checkout for recovery. Diagrams are Mermaid code blocks in Markdown. If a reader's renderer does not support Mermaid, the diagram source and surrounding prose remain available.

Before making the repository private, verify all essential Wiki content and any manually added images/attachments are preserved in docs or approved assets. This mirror covers Markdown in docs, not unknown historical Wiki attachments. Wiki availability and Pages availability depend on GitHub plan/visibility; verify before changing either.

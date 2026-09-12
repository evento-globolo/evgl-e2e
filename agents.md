# Repository agent instructions

Follow the organization-wide branching, semantic-conflict, security, and evidence rules in `evento-globolo/.github`.

- Preserve the canonical repository identity `evento-globolo/evgl-e2e`; never create a long-name duplicate.
- Treat `.zpkg.toml` as dependency intent and generate `.zpkg.lock` only through a real resolver.
- Keep browser tests deterministic and safe against the local fixture server by default.
- Live endpoint, account, payment, identity, or legal-document tests require isolated test tenants and explicit secrets; never record credentials, cookies, prompts, responses, customer data, or legal records.
- Use feature branches and draft pull requests. Do not reset, clean, stash, rebase, force-push, or discard unfamiliar work.

## Repository-local Git worktrees

- Create or use a Git worktree only when the human operator explicitly authorizes it for the current task. Concurrency or a dirty checkout is not permission by itself.
- Put every authorized worktree at `<repository-root>/tmp/worktrees/<name>`; from the repository root, use `./tmp/worktrees/<name>`. Never place worktrees beside repositories or organization directories.
- Keep `tmp`, `temp`, `tmp/worktrees`, and `temp/worktrees` ignored in the repository-root `.gitignore`. Do not commit files from those directories.
- Relocate or remove a worktree only when the operator explicitly requests it. Before removal, preserve and publish intended changes, verify its commit is represented on the target branch, and confirm there are no tracked, untracked, ignored-sensitive, or in-use files that must survive. Remove it with `git worktree remove <path>` without `--force`; never delete a worktree directory with `rm`.

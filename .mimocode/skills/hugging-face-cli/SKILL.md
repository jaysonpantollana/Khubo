---
name: hugging-face-cli
description: "Use when working with hugging-face-cli"
---

---
source: "https://github.com/huggingface/skills/tree/main/skills/hf-cli"
name: hugging-face-cli
description: "Use the Hugging Face Hub CLI (`hf`) to download, upload, and manage models, datasets, and Spaces."
risk: unknown
---

Install by downloading the installer script first, reviewing it, and then running it locally. Example:
`tmpdir="$(mktemp -d)" && trap 'rm -rf "$tmpdir"' EXIT && curl -LsSf https://hf.co/cli/install.sh -o "$tmpdir/hf-install.sh" && less "$tmpdir/hf-install.sh" && bash "$tmpdir/hf-install.sh"`

## When to Use
Use this skill when you need the `hf` CLI for Hub authentication, downloads, uploads, repo management, or basic compute operations.

The Hugging Face Hub CLI tool `hf` is available. IMPORTANT: The `hf` command replaces the deprecated `huggingface-cli` command.

Use `hf --help` to view available functions. Note that auth commands are now all under `hf auth` e.g. `hf auth whoami`.

Generated with `huggingface_hub v1.8.0`. Run `hf skills add --force` to regenerate.

## Commands

- `hf download REPO_ID` â€” Download files from the Hub. `[--type CHOICE --revision TEXT --include TEXT --exclude TEXT --cache-dir TEXT --local-dir TEXT --force-download --dry-run --quiet --max-workers INTEGER]`
- `hf env` â€” Print information about the environment.
- `hf sync` â€” Sync files between local directory and a bucket. `[--delete --ignore-times --ignore-sizes --plan TEXT --apply TEXT --dry-run --include TEXT --exclude TEXT --filter-from TEXT --existing --ignore-existing --verbose --quiet]`
- `hf upload REPO_ID` â€” Upload a file or a folder to the Hub. Recommended for single-commit uploads. `[--type CHOICE --revision TEXT --private --include TEXT --exclude TEXT --delete TEXT --commit-message TEXT --commit-description TEXT --create-pr --every FLOAT --quiet]`
- `hf upload-large-folder REPO_ID LOCAL_PATH` â€” Upload a large folder to the Hub. Recommended for resumable uploads. `[--type CHOICE --revision TEXT --private --include TEXT --exclude TEXT --num-workers INTEGER --no-report --no-bars]`
- `hf version` â€” Print information about the hf version.

### `hf auth` â€” Manage authentication (login, logout, etc.).

- `hf auth list` â€” List all stored access tokens.
- `hf auth login` â€” Login using a token from huggingface.co/settings/tokens. `[--add-to-git-credential --force]`
- `hf auth logout` â€” Logout from a specific token. `[--token-name TEXT]`
- `hf auth switch` â€” Switch between access tokens. `[--token-name TEXT --add-to-git-credential]`
- `hf auth whoami` â€” Find out which huggingface.co account you are logged in as. `[--format CHOICE]`

### `hf buckets` â€” Commands to interact with buckets.

- `hf buckets cp SRC` â€” Copy a single file to or from a bucket. `[--quiet]`
- `hf buckets create BUCKET_ID` â€” Create a new bucket. `[--private --exist-ok --quiet]`
- `hf buckets delete BUCKET_ID` â€” Delete a bucket. `[--yes --missing-ok --quiet]`
- `hf buckets info BUCKET_ID` â€” Get info about a bucket. `[--quiet]`
- `hf buckets list` â€” List buckets or files in a bucket. `[--human-readable --tree --recursive --format CHOICE --quiet]`
- `hf buckets move FROM_ID TO_ID` â€” Move (rename) a bucket to a new name or namespace.
- `hf buckets remove ARGUMENT` â€” Remove files from a bucket. `[--recursive --yes --dry-run --include TEXT --exclude TEXT --quiet]`
- `hf buckets sync` â€” Sync files between local directory and a bucket. `[--delete --ignore-times --ignore-sizes --plan TEXT --apply TEXT --dry-run --include TEXT --exclude TEXT --filter-from TEXT --existing --ignore-existing --verbose --quiet]`

### `hf cache` â€” Manage local cache directory.

- `hf cache list` â€” List cached repositories or revisions. `[--cache-dir TEXT --revisions --filter TEXT --format CHOICE --quiet --sort CHOICE --limit INTEGER]`
- `hf cache prune` â€” Remove detached revisions from the cache. `[--cache-dir TEXT --yes --dry-run]`
- `hf cache rm TARGETS` â€” Remove cached repositories or revisions. `[--cache-dir TEXT --yes --dry-run]`
- `hf cache verify REPO_ID` â€” Verify checksums for a single repo revision from cache or a local directory. `[--type CHOICE --revision TEXT --cache-dir TEXT --local-dir TEXT --fail-on-missing-files --fail-on-extra-files]`

### `hf collections` â€” Interact with collections on the Hub.

- `hf collections add-item COLLECTION_SLUG ITEM_ID ITEM_TYPE` â€” Add an item to a collection. `[--note TEXT --exists-ok]`
- `hf collections create TITLE` â€” Create a new collection on the Hub. `[--namespace TEXT --description TEXT --private --exists-ok]`
- `hf collections delete COLLECTION_SLUG` â€” Delete a collection from the Hub. `[--missing-ok]`
- `hf collections delete-item COLLECTION_SLUG ITEM_OBJECT_ID` â€” Delete an item from a collection. `[--missing-ok]`
- `hf collections info COLLECTION_SLUG` â€” Get info about a collection on the Hub. Output is in JSON format.
- `hf collections list` â€” List collections on the Hub. `[--owner TEXT --item TEXT --sort CHOICE --limit INTEGER --format CHOICE --quiet]`
- `hf collections update COLLECTION_SLUG` â€” Update a collection's metadata on the Hub. `[--title TEXT --description TEXT --position INTEGER --private --theme TEXT]`
- `hf collections update-item COLLECTION_SLUG ITEM_OBJECT_ID` â€” Update an item in a collection. `[--note TEXT --position INTEGER]`

### `hf datasets` â€” Interact with datasets on the Hub.

- `hf datasets info DATASET_ID` â€” Get info about a dataset on the Hub. Output is in JSON format. `[--revision TEXT --expand TEXT]`
- `hf datasets list` â€” List datasets on the Hub. `[--search TEXT --author TEXT --filter TEXT --sort CHOICE --limit INTEGER --expand TEXT --format CHOICE --quiet]`
- `hf datasets parquet DATASET_ID` â€” List parquet file URLs available for a dataset. `[--subset TEXT --split TEXT --format CHOICE --quiet]`
- `hf datasets sql SQL` â€” Execute a raw SQL query with DuckDB against dataset parquet URLs. `[--format CHOICE]`

### `hf discussions` â€” Manage discussions and pull requests on the Hub.

- `hf discussions close REPO_ID NUM` â€” Close a discussion or pull request. `[--comment TEXT --yes --type CHOICE]`
- `hf discussions comment REPO_ID NUM` â€” Comment on a discussion or pull request. `[--body TEXT --body-file PATH --type CHOICE]`
- `hf discussions create REPO_ID --title TEXT` â€” Create a new discussion or pull request on a repo. `[--body TEXT --body-file PATH --pull-request --type CHOICE]`
- `hf discussions diff REPO_ID NUM` â€” Show the diff of a pull request. `[--type CHOICE]`
- `hf discussions info REPO_ID NUM` â€” Get info about a discussion or pull request. `[--comments --diff --no-color --type CHOICE --format CHOICE]`
- `hf discussions list REPO_ID` â€” List discussions and pull requests on a repo. `[--status CHOICE --kind CHOICE --author TEXT --limit INTEGER --type CHOICE --format CHOICE --quiet]`
- `hf discussions merge REPO_ID NUM` â€” Merge a pull request. `[--comment TEXT --yes --type CHOICE]`
- `hf discussions rename REPO_ID NUM NEW_TITLE` â€” Rename a discussion or pull request. `[--type CHOICE]`
- `hf discussions reopen REPO_ID NUM` â€” Reopen a closed discussion or pull request. `[--comment TEXT --yes --type CHOICE]`

### `hf endpoints` â€” Manage Hugging Face Inference Endpoints.

- `hf endpoints catalog deploy --repo TEXT` â€” Deploy an Inference Endpoint from the Model Catalog. `[--name TEXT --accelerator TEXT --namespace TEXT]`
- `hf endpoints catalog list` â€” List available Catalog models.
- `hf endpoints delete NAME` â€” Delete an Inference Endpoint permanently. `[--namespace TEXT --yes]`
- `hf endpoints deploy NAME --repo TEXT --framework TEXT --accelerator TEXT --instance-size TEXT --instance-type TEXT --region TEXT --vendor TEXT` â€” Deploy an Inference Endpoint from a Hub repository. `[--namespace TEXT --task TEXT --min-replica INTEGER --max-replica INTEGER --scale-to-zero-timeout INTEGER --scaling-metric CHOICE --scaling-threshold FLOAT]`
- `hf endpoints describe NAME` â€” Get information about an existing endpoint. `[--namespace TEXT]`
- `hf endpoints list` â€” Lists all Inference Endpoints for the given namespace. `[--namespace TEXT --format CHOICE --quiet]`
- `hf endpoints pause NAME` â€” Pause an Inference Endpoint. `[--namespace TEXT]`
- `hf endpoints resume NAME` â€” Resume an Inference Endpoint. `[--namespace TEXT --fail-if-already-running]`
- `hf endpoints scale-to-zero NAME` â€” Scale an Inference Endpoint to zero. `[--namespace TEXT]`
- `hf endpoints update NAME` â€” Update an existing endpoint. `[--namespace TEXT --repo TEXT --accelerator TEXT --instance-size TEXT --instance-type TEXT --framework TEXT --revision TEXT --task TEXT --min-replica INTEGER --max-replica INTEGER --scale-to-zero-timeout INTEGER --scaling-metric CHOICE --scaling-threshold FLOAT]`

### `hf extensions` â€” Manage hf CLI extensions.

- `hf extensions exec NAME` â€” Execute an installed extension.
- `hf extensions install REPO_ID` â€” Install an extension from a public GitHub repository. `[--force]`
- `hf extensions list` â€” List installed extension commands. `[--format CHOICE --quiet]`
- `hf extensions remove NAME` â€” Remove an installed extension.
- `hf extensions search` â€” Search extensions available on GitHub (tagged with 'hf-extension' topic). `[--format CHOICE --quiet]`

### `hf jobs` â€” Run and manage Jobs on the Hub.

- `hf jobs cancel JOB_ID` â€” Cancel a Job `[--namespace TEXT]`
- `hf jobs hardware` â€” List available hardware options for Jobs
- `hf jobs inspect JOB_IDS` â€” Display detailed information on one or more Jobs `[--namespace TEXT]`
- `hf jobs logs JOB_ID` â€” Fetch the logs of a Job. `[--follow --tail INTEGER --namespace TEXT]`
- `hf jobs ps` â€” List Jobs. `[--all --namespace TEXT --filter TEXT --format TEXT --quiet]`
- `hf jobs run IMAGE COMMAND` â€” Run a Job. `[--env TEXT --secrets TEXT --label TEXT --volume TEXT --env-file TEXT --secrets-file TEXT --flavor CHOICE --timeout TEXT --detach --namespace TEXT]`
- `hf jobs scheduled delete SCHEDULED_JOB_ID` â€” Delete a scheduled Job. `[--namespace TEXT]`
- `hf jobs scheduled inspect SCHEDULED_JOB_IDS` â€” Display detailed information on one or more scheduled Jobs `[--namespace TEXT]`
- `hf jobs scheduled ps` â€” List scheduled Jobs `[--all --namespace TEXT --filter TEXT --format TEXT --quiet]`
- `hf jobs scheduled resume SCHEDULED_JOB_ID` â€” Resume (unpause) a scheduled Job. `[--namespace TEXT]`
- `hf jobs scheduled run SCHEDULE IMAGE COMMAND` â€” Schedule a Job. `[--suspend --concurrency --env TEXT --secrets TEXT --label TEXT --volume TEXT --env-file TEXT --secrets-file TEXT --flavor CHOICE --timeout TEXT --namespace TEXT]`
- `hf jobs scheduled suspend SCHEDULED_JOB_ID` â€” Suspend (pause) a scheduled Job. `[--namespace TEXT]`
- `hf jobs scheduled uv run SCHEDULE SCRIPT` â€” Run a UV script (local file or URL) on HF infrastructure `[--suspend --concurrency --image TEXT --flavor CHOICE --env TEXT --secrets TEXT --label TEXT --volume TEXT --env-file TEXT --secrets-file TEXT --timeout TEXT --namespace TEXT --with TEXT --python TEXT]`
- `hf jobs stats` â€” Fetch the resource usage statistics and metrics of Jobs `[--namespace TEXT]`
- `hf jobs uv run SCRIPT` â€” Run a UV script (local file or URL) on HF infrastructure `[--image TEXT --flavor CHOICE --env TEXT --secrets TEXT --label TEXT --volume TEXT --env-file TEXT --secrets-file TEXT --timeout TEXT --detach --namespace TEXT --with TEXT --python TEXT]`

### `hf models` â€” Interact with models on the Hub.

- `hf models info MODEL_ID` â€” Get info about a model on the Hub. Output is in JSON format. `[--revision TEXT --expand TEXT]`
- `hf models list` â€” List models on the Hub. `[--search TEXT --author TEXT --filter TEXT --num-parameters TEXT --sort CHOICE --limit INTEGER --expand TEXT --format CHOICE --quiet]`

### `hf papers` â€” Interact with papers on the Hub.

- `hf papers info PAPER_ID` â€” Get info about a paper on the Hub. Output is in JSON format.
- `hf papers list` â€” List daily papers on the Hub. `[--date TEXT --week TEXT --month TEXT --submitter TEXT --sort CHOICE --limit INTEGER --format CHOICE --quiet]`
- `hf papers read PAPER_ID` â€” Read a paper as markdown.
- `hf papers search QUERY` â€” Search papers on the Hub. `[--limit INTEGER --format CHOICE --quiet]`

### `hf repos` â€” Manage repos on the Hub.

- `hf repos branch create REPO_ID BRANCH` â€” Create a new branch for a repo on the Hub. `[--revision TEXT --type CHOICE --exist-ok]`
- `hf repos branch delete REPO_ID BRANCH` â€” Delete a branch from a repo on the Hub. `[--type CHOICE]`
- `hf repos create REPO_ID` â€” Create a new repo on the Hub. `[--type CHOICE --space-sdk TEXT --private --public --protected --exist-ok --resource-group-id TEXT --flavor TEXT --storage TEXT --sleep-time INTEGER --secrets TEXT --secrets-file TEXT --env TEXT --env-file TEXT]`
- `hf repos delete REPO_ID` â€” Delete a repo from the Hub. This is an irreversible operation. `[--type CHOICE --missing-ok]`
- `hf repos delete-files REPO_ID PATTERNS` â€” Delete files from a repo on the Hub. `[--type CHOICE --revision TEXT --commit-message TEXT --commit-description TEXT --create-pr]`
- `hf repos duplicate FROM_ID` â€” Duplicate a repo on the Hub (model, dataset, or Space). `[--type CHOICE --private --public --protected --exist-ok --flavor TEXT --storage TEXT --sleep-time INTEGER --secrets TEXT --secrets-file TEXT --env TEXT --env-file TEXT]`
- `hf repos move FROM_ID TO_ID` â€” Move a repository from a namespace to another namespace. `[--type CHOICE]`
- `hf repos settings REPO_ID` â€” Update the settings of a repository. `[--gated CHOICE --private --public --protected --type CHOICE]`
- `hf repos tag create REPO_ID TAG` â€” Create a tag for a repo. `[--message TEXT --revision TEXT --type CHOICE]`
- `hf repos tag delete REPO_ID TAG` â€” Delete a tag for a repo. `[--yes --type CHOICE]`
- `hf repos tag list REPO_ID` â€” List tags for a repo. `[--type CHOICE]`

### `hf skills` â€” Manage skills for AI assistants.

- `hf skills add` â€” Download a skill and install it for an AI assistant. `[--claude --codex --cursor --opencode --global --dest PATH --force]`
- `hf skills preview` â€” Print the generated SKILL.md to stdout.

### `hf spaces` â€” Interact with spaces on the Hub.

- `hf spaces dev-mode SPACE_ID` â€” Enable or disable dev mode on a Space. `[--stop]`
- `hf spaces hot-reload SPACE_ID` â€” Hot-reload any Python file of a Space without a full rebuild + restart. `[--local-file TEXT --skip-checks --skip-summary]`
- `hf spaces info SPACE_ID` â€” Get info about a space on the Hub. Output is in JSON format. `[--revision TEXT --expand TEXT]`
- `hf spaces list` â€” List spaces on the Hub. `[--search TEXT --author TEXT --filter TEXT --sort CHOICE --limit INTEGER --expand TEXT --format CHOICE --quiet]`

### `hf webhooks` â€” Manage webhooks on the Hub.

- `hf webhooks create --watch TEXT` â€” Create a new webhook. `[--url TEXT --job-id TEXT --domain CHOICE --secret TEXT]`
- `hf webhooks delete WEBHOOK_ID` â€” Delete a webhook permanently. `[--yes]`
- `hf webhooks disable WEBHOOK_ID` â€” Disable an active webhook.
- `hf webhooks enable WEBHOOK_ID` â€” Enable a disabled webhook.
- `hf webhooks info WEBHOOK_ID` â€” Show full details for a single webhook as JSON.
- `hf webhooks list` â€” List all webhooks for the current user. `[--format CHOICE --quiet]`
- `hf webhooks update WEBHOOK_ID` â€” Update an existing webhook. Only provided options are changed. `[--url TEXT --watch TEXT --domain CHOICE --secret TEXT]`

## Common options

- `--format` â€” Output format: `--format json` (or `--json`) or `--format table` (default).
- `-q / --quiet` â€” Minimal output.
- `--revision` â€” Git revision id which can be a branch name, a tag, or a commit hash.
- `--token` â€” Use a User Access Token. Prefer setting `HF_TOKEN` env var instead of passing `--token`.
- `--type` â€” The type of repository (model, dataset, or space).

## Mounting repos as local filesystems

To mount Hub repositories or buckets as local filesystems â€” no download, no copy, no waiting â€” use `hf-mount`. Files are fetched on demand. GitHub: https://github.com/huggingface/hf-mount

Install by downloading the installer locally, reviewing it, and then running it. Example:
`tmpdir="$(mktemp -d)" && trap 'rm -rf "$tmpdir"' EXIT && curl -fsSL https://raw.githubusercontent.com/huggingface/hf-mount/main/install.sh -o "$tmpdir/hf-mount-install.sh" && less "$tmpdir/hf-mount-install.sh" && sh "$tmpdir/hf-mount-install.sh"`

Some command examples:
- `hf-mount start repo openai-community/gpt2 /tmp/gpt2` â€” mount a repo (read-only)
- `hf-mount start --hf-token $HF_TOKEN bucket myuser/my-bucket /tmp/data` â€” mount a bucket (read-write)
- `hf-mount status` / `hf-mount stop /tmp/data` â€” list or unmount

## Tips

- Use `hf <command> --help` for full options, descriptions, usage, and real-world examples
- Authenticate with `HF_TOKEN` env var (recommended) or with `--token`

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.


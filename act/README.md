# ACT - Run Github Action Locally

[Github Repo](https://github.com/nektos/act)

## Installation

```bash
curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

# [Example Commands](https://github.com/nektos/act#example-commands)

```bash
# Command structure:
act [<event>] [options]
If no event name passed, will default to "on: push"
If actions handles only one event it will be used as default instead of "on: push"

# List all actions for all events:
act -l

# List the actions for a specific event:
act workflow_dispatch -l

# List the actions for a specific job:
act -j test -l

# Run the default (`push`) event:
act

# Run a specific event:
act pull_request

# Run a specific job:
act -j test

# Collect artifacts to the /tmp/artifacts folder:
act --artifact-server-path /tmp/artifacts

# Run a job in a specific workflow (useful if you have duplicate job names)
act -j lint -W .github/workflows/checks.yml

# Run in dry-run mode:
act -n

# Enable verbose-logging (can be used with any of the above commands)
act -v
```

# [Configuration](https://github.com/nektos/act#configuration)

You can provide default configuration flags to `act` by either creating a `./.actrc` or a `~/.actrc` file. Any flags in the files will be applied before any flags provided directly on the command line. For example, a file like below will always use the `nektos/act-environments-ubuntu:18.04` image for the `ubuntu-latest` runner:

# sample .actrc file

```bash .actrc
-P ubuntu-latest=nektos/act-environments-ubuntu:18.04
```

Additionally, act supports loading environment variables from an `.env` file. The default is to look in the working directory for the file but can be overridden by:

```bash
act --env-file my.env
```

```bash
.env:
	MY_ENV_VAR=MY_ENV_VAR_VALUE
	MY_2ND_ENV_VAR="my 2nd env var value"
```

<h3>Pass Inputs & Values</h3>
## [via input or input-file flag](https://github.com/nektos/act#via-input-or-input-file-flag)
-   `act --input NAME=somevalue` - use `somevalue` as the value for `NAME` input.
-   `act --input-file my.input` - load input values from `my.input` file.
    -   input file format is the same as `.env` format

## [via JSON](https://github.com/nektos/act#via-json)

Example JSON payload file conveniently named `payload.json`

```yaml
{ "inputs": { "NAME": "Manual Workflow", "SOME_VALUE": "ABC" } }
```

Command for triggering the workflow

```bash
act workflow_dispatch -e payload.json
```

<h3>Authentication (for private repos)</h3>
*requires old style api token which begins with ghp_*
- Create a GITHUB_ACCESS_TOKEN in GitHub UI (Settings > Developer Tools).
- Save the value into 'my.secrets' as GITHUB_TOKEN=</value>

<h3>Dicrectories Structure</h3>
```bash
.
├── ACT
│   ├── my.env
│   ├── my.input
│   └── my.secrets
├── .actrc
└── .github
    ├── actions
    │   └── rollback
    │       └── action.yaml
    └── workflows
        └── rollback-example.yaml

5 directories, 6 files

````

Run-Command:
```bash
# DryRun
act --secret-file ./ACT/my.secrets --input-file ./ACT/my.input --env-file ./ACT/my.env -n

# Run
act --secret-file ./ACT/my.secrets --input-file ./ACT/my.input --env-file ./ACT/my.env
````

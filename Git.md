### What's Git?

<figure>
<img src="Git-media/git-diagram.svg"
title="git-diagram" alt="" />
</figure>

#### [Basics command for Git](#basics-command-for-git-1)
* [`git init`](#git-init)
* [`git add`](#git-add)
* [`git status`](#git-status)
* [`git commit`](#git-commit)
* [`git remote`](#git-remote)
* [`git push`](#git-push)
* [`git clone`](#git-clone)
* [`git pull`](#git-pull)
* [`.gitignore`](#gitignore)
* [`git log`](#git-log)
* [`git reset`](#git-reset)

#### [Branching](#branching-1)

* [`git branch`](#git-branch)
* [`git checkout`](#git-checkout)
* [`git switch`](#git-switch)

#### [Merge vs Rebase](#merge-vs-rebase-1)
* [`git merge`](#git-merge)

---

### Basics command for Git

#### `git init` 
Initialize Git
```bash
$ git init         # Initiates an empty git repository
```

#### `git add`
Add files to the staging area for commit
```bash
$ git add .  
# Adds all the files in the local repository and stages them for commit

$ git add README.md 
# To add a specific file
```

#### `git status`

Checking stages (Best practice : always checking stages before commit)
```bash
$ git status       # Lists all new or modified files to be committed
```

#### `git commit`

Commit changes you made to your Git repo (local)
```bash
$ git commit -m "commit message"
# commit message should describe what you have changed
```

#### `git remote`

Add a remote to your Github Repo
```bash
$ git remote add origin <remote_repository_URL>
# sets the new remote as origin
```

List the remote connection you have to other repository
```bash
$ git remote -v    
# lists the URLs of the remote connections you have to other repositories
```

#### `git push`

Pushes the changes in your local repository to the remote repository (Github)
```bash
$ git push origin master 
# pushes changes to origin
```

#### `git clone`

Cloning a Git Repo
```bash
$ git clone <remote_repository_URL>
```

#### `git pull`

Pulling changes from remote repository to your local repository
```bash
$ git pull origin main

# But if you have upstream you can use
$ git pull

# git pull is combination of git fetch and git merge (git fetch followed by git merge)
```

#### `.gitignore`

Ignore files/folders
```bash
$ touch .gitignore
$ echo "file/folder name" > .gitignore
# git will ignore all file or folder in .gitignore
```

#### `git log`

View commit history
```bash
$ git log          # Showing commit history (default format)
```
<figure>
<img src="Git-media/gitlog.gif"
title="git-diagram" alt="" />
</figure>

#### `git reset`

Uncommit Changes you just made to your Git Repo
```bash
$ git reset HEAD~1
# HEAD is pointer to your current commit (in this case latest commit)
# HEAD~1 go back 1 commit further from HEAD
# Remove the most recent commit
# And you need to commit again!

$ git reset <commit hash>
# Remove commit to your certain commit 
```

Undo Changes you just made to your Git Repo
```bash
$ git reset --hard <commit hash>
# Remove commit and all change to your certain commit
```

### Branching

#### `git branch`
List all branches
```bash
$ git branch

$ git branch -a    
# -a (--all) : list all branch including remote branch 
```

#### `git checkout`

Create branch
```bash
$ git branch <branch name>

# OR create and move to that branch
$ git checkout -b <branch name>
```

Delete branch
```bash
$ git branch -d <branch name>
```

#### `git switch`

Switching between branch
```bash
$ git checkout <branch name>
# or
$ git switch <branch name>
# switch to specific branch

$ git checkout -
# switch to previous branch
```

Switching to specific version
```bash
$ git checkout <commit hash>
# switch to specific commit (your working directory also change to that commit)

# But if your change and commit, this will create unnamed branch from this version. To prevent this we will use
$ git checkout <commit hash> <file/folder to switch>

# ex. git checkout a1e8fb5 .
# this will switch all file in working directory to version that commit hash is a1e8fb5 and if you have change and commit, this will continue your commit in your branch 
```

#### `git merge`

Merging branch
```bash
$ git merge <branch name>
# Merge specific branch into the current branch

# usually we don't merge into main branch on local repository we will merge main branch on remote repository
# we use this only if main branch on remote repository is update and we want our feature branch that we dev to also update with main branch
# ex. on feature branch
#  	 git merge main
# to update our feature branch up to date with main branch
```


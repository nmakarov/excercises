### differences with the previous commit

You just did `git pull`, saw a few files changed and would like to know exact details

```
# contents difference
git diff HEAD@{1}
git diff HEAD@{1} filename

# just the filenames
git diff --name-only HEAD@{1}
```

Get back one file

```
git checkout filename

#if `filename` matches branch name:
git checkout -- filename
```

Get back all to last commit

```
git reset --hard
```

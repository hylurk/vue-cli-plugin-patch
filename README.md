# vue-cli-plugin-patch

A plugin that can help you create project friendly with Vue for @vue/cli 4.5.

## Install

First you need to install `@vue/cli` globally (follow the instructions [here](https://cli.vuejs.org/)).

Then create a project and add the Patch plugin:

```bash
vue create my-app

cd my-app

vue add patch
```

## Use with vue-cli UI

Skip this part if you've done everything in the `Install` section.

If you prefer managing your project in vue-cli UI (by running `vue ui`), here's how you can add Patch plugin: go to the Plugins menu, click the upper right `+ Add plugin` button, find `vue-cli-plugin-patch` and install it.

## Why use

- Create MPA easily

- Add commitlint directly

- Auto import package 'normalize.css'

## Suggestion

If you use VSCode to write code, it is strongly recommended to install the eslint plugin to automatically repair the format.

You can like this:

First, search for and install `ESLint` in the vscode plugin bar.

Second, find `user > extension > eslint` in the tab of `preferences > settings`, drop down and find `edit in settings.json`, click to open it.

Finally, copy the following code and save it:
```json
{
  "editor.tabSize": 2,
  "editor.fontSize": 16,
  "workbench.iconTheme": "vscode-great-icons",
  "eslint.options": {
      "extensions": [
          ".js",
          ".vue"
      ]
  },
  "editor.codeActionsOnSave": {
      "source.fixAll": true
  },
  "eslint.alwaysShowStatus": true
}
```

Of course, you can change other options yourself.

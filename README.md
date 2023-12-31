# Markdown List Linter

Lints markdown lists and warn when list items are not alphabetically ordered.

## A complete solution

This functionality is available to be consumed in three different ways:

- ⚡ [A GitHub Action](https://github.com/marketplace/actions/markdown-list-linter) as part of your CI/CD process

- 📦 [An NPM package](https://www.npmjs.com/package/markdown-list-linter) that can be consumed in your JavaScript or TypeScript code

- 💻 [A CLI](https://www.npmjs.com/package/markdown-list-linter-cli) that you can run in your terminal

## Installation

You can install this package in your JavaScript or Typescript project.

```shell
npm install markdown-list-linter
```

## Usage

Very simple to use, all results will be container in the returned object.

```typescript
import { lintMarkdownList } from '../src/markdown-list-linter'

const results = lintMarkdownList('./path/to/markdown/file.md')
console.log(results)
```

When there are no errors, the returned object should look something like this. The property `formattedMessage` is supplied if you need to print the output to a terminal console.

```js
{
  'summary': 'No errors found',
  'formattedMessage': 'SUMMARY:\nNo errors found\n'
}
```

When there are errors, the returned object should look something like this.

```js
{
  'summary': 'Markdown list needs to be sorted',
  'errorObject': [
      {
          'type': 'HEADINGS',
          'message': 'Please correct the alphabetical order for these heading items',
          'details': [
            ['C'],
            ['D', 'A']
          ],
      },
      {
          'type': 'LIST_ITEMS',
          'message': 'Please correct the alphabetical order for these list items',
          'details': [
            [
                `[African Buffalo]('https://www.AfricanBuffalo.com')`,
                `[Aardwolf]('https://www.Aardwolf.com')`
            ]
          ],
      }
  ],
  'formattedMessage': "SUMMARY:\nMarkdown list needs to be sorted\n\nDETAILS:\nPlease correct the alphabetical order for these heading items\n\tSection #1\n\t\tD\n\t\tA\n\t\tB\n\t\tC\n\nPlease correct the alphabetical order for these list items\n\tSection #1\n\t\t[African Buffalo]('https://www.AfricanBuffalo.com')\n\t\t[Aardwolf]('https://www.Aardwolf.com')\n\n\"
}
```

The array items in the `details` object is sections in the list which need to be reordered.

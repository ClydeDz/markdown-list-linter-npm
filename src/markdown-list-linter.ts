import * as fs from "fs";
import {
  compareJson,
  formatHeadingErrors,
  formatListItemErrors,
  getAllHeadings,
  getAllListItems,
  sortItems,
} from "./utility";
import { IMarkdownListLinter, IMarkdownListLinterErrors } from "./interface";

const errors: IMarkdownListLinterErrors[] = [];

export const lintMarkdownList = (
  filename: string
): IMarkdownListLinter => {
  const data = fs.readFileSync(filename, "utf8");
  const sanitizedData = data.replaceAll("\r", "\n");
  const regexp =
    /(?<=#{1,6} (.*)\n(?:(?!#).*\n)*)(?=[+*-] (.*(?:\n(?![#+*-]).+)?))/g;
  const matches = [...sanitizedData.matchAll(regexp)];

  const headings = getAllHeadings(matches);
  const listItems = getAllListItems(matches);

  const sortedHeadings = sortItems([...headings]);
  const sortedListItems = sortItems([...listItems]);

  const headingErrors = compareJson(headings, sortedHeadings);
  headingErrors ? errors.push(formatHeadingErrors(headingErrors)) : false;

  const listItemErrors = compareJson(listItems, sortedListItems);
  listItemErrors ? errors.push(formatListItemErrors(listItemErrors)) : false;

  if (errors.length < 1) {
    return {
      summary: "No errors found",
    };
  }

  return {
    summary: "Markdown list needs to be sorted",
    errorObject: errors,
  };
};

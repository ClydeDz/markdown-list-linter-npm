import * as fs from "fs";
import {
  compareJson,
  constructErrorObject,
  getAllHeadings,
  getAllListItems,
  sortItemsAlphabetically,
} from "./utility";
import { IMarkdownListLinter, IMarkdownListLinterErrors, MarkdownListType } from "./interface";

/**
 * Lints the markdown list
 * @param {string} filename The full path to the markdown file
 * @returns {IMarkdownListLinter} A summary of the lint process and optionally an error objec t if a lint issue exists
 */
export const lintMarkdownList = (
  filename: string
): IMarkdownListLinter => {
  const errors: IMarkdownListLinterErrors[] = [];
  const regexp =
  /(?<=#{1,6} (.*)\n(?:(?!#).*\n)*)(?=[+*-] (.*(?:\n(?![#+*-]).+)?))/g;

  const data = fs.readFileSync(filename, "utf8");
  const sanitizedData = data.replaceAll("\r", "\n");  
  const matches = [...sanitizedData.matchAll(regexp)];

  const headings = getAllHeadings(matches);
  const listItems = getAllListItems(matches);

  const sortedHeadings = sortItemsAlphabetically([...headings]);
  const sortedListItems = sortItemsAlphabetically([...listItems]);

  const headingErrors = compareJson(headings, sortedHeadings);
  headingErrors ? errors.push(constructErrorObject(headingErrors, MarkdownListType.Headings)) : false;

  const listItemErrors = compareJson(listItems, sortedListItems);
  listItemErrors ? errors.push(constructErrorObject(listItemErrors, MarkdownListType.ListItems)) : false;

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

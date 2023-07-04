export interface IMarkdownListLinter {
    summary: string;
    errorObject?: IMarkdownListLinterErrors[];
  }
  
export interface IMarkdownListLinterErrors {
    type: string;
    message: string;
    details: string[][];
}
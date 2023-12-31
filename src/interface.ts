export interface IMarkdownListLinter {
  summary: string
  errorObject?: IMarkdownListLinterErrors[]
  formattedMessage?: string
}

export interface IMarkdownListLinterErrors {
  type: MarkdownListType
  message: string
  details: string[][]
}

export enum MarkdownListType {
  Headings = 'HEADINGS',
  ListItems = 'LIST_ITEMS',
}

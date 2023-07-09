import {
  IMarkdownListLinter,
  IMarkdownListLinterErrors,
  MarkdownListType,
} from './interface'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const diff = require('json-differ')

const SECTION_SEPARATOR = '&&SECTION_SEPARATOR&&'
const ITEM_SEPARATOR = '&&ITEM_SEPARATOR&&'
const DIFF_CHECK_NO_CHANGE = 'false'

interface IJsonErrors {
  [key: string]: string | number
  value: string | number
}

const getErrorMessage = (type: MarkdownListType) => {
  switch (type) {
    case MarkdownListType.Headings:
      return 'Please correct the alphabetical order for these heading items'
    case MarkdownListType.ListItems:
    default:
      return 'Please correct the alphabetical order for these list items'
  }
}

export const getAllHeadings = (dataset: RegExpMatchArray[]) => {
  return dataset.reduce((accumulator: string[], current) => {
    const [title] = current.slice(1)
    const isAdded = accumulator.find((e) => e === title)
    !isAdded ? accumulator.push(title) : undefined
    return accumulator
  }, [])
}

export const getAllListItems = (dataset: RegExpMatchArray[]) => {
  return dataset.reduce((accumulator: string[], current) => {
    const [listItem] = current.slice(2)
    accumulator.push(listItem)
    return accumulator
  }, [])
}

export const sortItemsAlphabetically = (items: string[]) => {
  return items.sort((a, b) => {
    return a.localeCompare(b)
  })
}

export const compareJson = (
  original: string[],
  sorted: string[]
): string | undefined => {
  const diffCheckResult = diff(
    JSON.stringify({ ...sorted }),
    JSON.stringify({ ...original })
  )
  return diffCheckResult === DIFF_CHECK_NO_CHANGE ? undefined : diffCheckResult
}

export const constructErrorObject = (
  errors: string,
  type: MarkdownListType
): IMarkdownListLinterErrors => {
  let errorBuilder = ''
  const errorsInJson: IJsonErrors = JSON.parse(errors)

  Object.keys(errorsInJson).reduce((accumulator: string[], current: string) => {
    const isAdded = accumulator.find((e) => e === current)
    const previousElement = accumulator[accumulator.length - 1]
    !isAdded ? accumulator.push(current) : undefined

    if (previousElement) {
      if (Number(current) - Number(previousElement) > 1) {
        errorBuilder += SECTION_SEPARATOR
      }
    }
    errorBuilder += errorsInJson[current] += ITEM_SEPARATOR
    return accumulator
  }, [])

  return {
    type,
    message: getErrorMessage(type),
    details: errorBuilder.split(SECTION_SEPARATOR).map(function (errorItems) {
      return errorItems.split(ITEM_SEPARATOR).filter((item) => item)
    }),
  }
}

export const buildFormattedMessage = (result: IMarkdownListLinter) => {
  let outputBuilder = ''
  outputBuilder += 'SUMMARY:\n' + result.summary + '\n'
  result.errorObject ? (outputBuilder += '\nDETAILS:\n') : undefined

  result.errorObject?.forEach((error) => {
    outputBuilder += error.message + '\n'

    error.details.forEach((errorSections, index) => {
      outputBuilder += '\tSection #' + (index + 1) + '\n'

      errorSections.forEach((errorItem) => {
        outputBuilder += '\t\t' + errorItem + '\n'
      })

      outputBuilder += '\n'
    })
  })
  return outputBuilder
}

const SIMPLE_LISTS_FILES_PREFIX = './__tests__/files/simple_lists/'
const LINKED_LISTS_FILES_PREFIX = './__tests__/files/linked_lists/'

const SimpleListFiles  = {
    ValidFile: `${SIMPLE_LISTS_FILES_PREFIX}valid_file.md`,
    UnorderedHeadings: `${SIMPLE_LISTS_FILES_PREFIX}unordered_headings.md`,
    UnorderedLists: `${SIMPLE_LISTS_FILES_PREFIX}unordered_lists.md`,
    UnorderedListsAndHeadings: `${SIMPLE_LISTS_FILES_PREFIX}unordered_lists_and_headings.md`,
}

const LinkedListFiles = {
    ValidFile: `${LINKED_LISTS_FILES_PREFIX}valid_file.md`,
    UnorderedHeadings: `${LINKED_LISTS_FILES_PREFIX}unordered_headings.md`,
    UnorderedLists: `${LINKED_LISTS_FILES_PREFIX}unordered_lists.md`,
    UnorderedListsAndHeadings: `${LINKED_LISTS_FILES_PREFIX}unordered_lists_and_headings.md`,
}

export const Files = {
    SimpleLists: {...SimpleListFiles},
    LinkedLists: {...LinkedListFiles}
}

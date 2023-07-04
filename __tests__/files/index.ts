const SIMPLE_LISTS_FILES_PREFIX = './__tests__/files/simple_lists/'
const LINKED_LISTS_FILES_PREFIX = './__tests__/files/linked_lists/'

const SimpleListFiles  = {
    Simple: `${SIMPLE_LISTS_FILES_PREFIX}basic_pass.md`,
    Reorder: `${SIMPLE_LISTS_FILES_PREFIX}unordered_headings.md`,
    Complex: `${SIMPLE_LISTS_FILES_PREFIX}unordered_lists`,
    A: `${SIMPLE_LISTS_FILES_PREFIX}unordered_lists_and_headings.md`,
}

const LinkedListFiles = {
    Simple: `${LINKED_LISTS_FILES_PREFIX}basic_pass.md`,
    Reorder: `${LINKED_LISTS_FILES_PREFIX}unordered_headings.md`,
    Complex: `${LINKED_LISTS_FILES_PREFIX}unordered_lists`,
    A: `${LINKED_LISTS_FILES_PREFIX}unordered_lists_and_headings.md`,
}

export const Files = {
    SimpleLists: {...SimpleListFiles},
    LinkedLists: {...LinkedListFiles}
}

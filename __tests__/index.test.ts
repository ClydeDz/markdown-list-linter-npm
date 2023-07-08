import {lintMarkdownList} from '../src/markdown-list-linter'
import { Files } from './files';

describe('lintMarkdownList()', () => {
    describe('given a valid file is tested', () => {
        describe.each([
            Files.SimpleLists.ValidFile,
            Files.LinkedLists.ValidFile
        ])('given file %s is passed', (markdownFile: string) => {
            it('should return with no errors', () => {
                const actual = lintMarkdownList(markdownFile)
                expect(actual).toMatchObject({ 'summary': 'No errors found', 'formattedMessage': 'SUMMARY:\nNo errors found\n'})
            })
        })
    })
    
    describe('given unordered headings are tested', () => {
        describe.each([
            Files.SimpleLists.UnorderedHeadings,
            Files.LinkedLists.UnorderedHeadings,
        ])('given file %s is passed', (markdownFile: string) => {
            it('should return with errors', () => {
                var expected = {
                    'summary': 'Markdown list needs to be sorted', 
                    'errorObject': [
                        {
                            'type': 'HEADINGS',
                            'message': 'Please correct the alphabetical order for these heading items',                        
                            'details': [['C'], ['D', 'A']],
                        }
                    ],
                }
                const actual = lintMarkdownList(markdownFile)
                expect(actual).toMatchObject(expected);
            })

            it('should return correct formatted message', () => {
                const expected = [
                    'SUMMARY:',
                    'Markdown list needs to be sorted',
                    '',
                    'DETAILS:',
                    'Please correct the alphabetical order for these heading items',
                    '\tSection #1',
                    '\t\tC',
                    '',
                    '\tSection #2',
                    '\t\tD',
                    '\t\tA',
                    '',
                    ''
                  ]
                const actual = lintMarkdownList(markdownFile)
                expect(actual.formattedMessage?.split('\n')).toMatchObject(expected);
            })
        })
    })
    
    describe('given unordered lists are tested', () => {
        const correctOrderForSimpleList = [['African Buffalo', 'Aardwolf'], ['Chameleon','Camel','Cheetah','Canary']]
        const correctOrderForLinkedList = [
            [
                `[African Buffalo]('https://www.AfricanBuffalo.com')`,
                `[Aardwolf]('https://www.Aardwolf.com')`
            ],
            [
                `[Chameleon]('https://www.Chameleon.com')`,
                `[Camel]('https://www.Camel.com')`,
                `[Cheetah]('https://www.Cheetah.com')`,
                `[Canary]('https://www.Canary.com')`
            ]
        ]
        const correctFormattedMessageCommonHeaders = [
            'SUMMARY:',
            'Markdown list needs to be sorted',
            '',
            'DETAILS:',
          ]
        const correctFormattedMessageForSimpleList = [
            ...correctFormattedMessageCommonHeaders,
            'Please correct the alphabetical order for these list items',
            '\tSection #1',
            '\t\tAfrican Buffalo',
            '\t\tAardwolf',
            '',
            '\tSection #2',
            '\t\tChameleon',
            '\t\tCamel',
            '\t\tCheetah',
            '\t\tCanary',
            '',
            ''
          ]
        const correctFormattedMessageForLinkedList = [
            ...correctFormattedMessageCommonHeaders,
            'Please correct the alphabetical order for these list items',
            '\tSection #1',
            `\t\t[African Buffalo]('https://www.AfricanBuffalo.com')`,
            `\t\t[Aardwolf]('https://www.Aardwolf.com')`,
            '',
            '\tSection #2',
            `\t\t[Chameleon]('https://www.Chameleon.com')`,
            `\t\t[Camel]('https://www.Camel.com')`,
            `\t\t[Cheetah]('https://www.Cheetah.com')`,
            `\t\t[Canary]('https://www.Canary.com')`,
            '',
            ''
          ]

        describe.each([
            [Files.SimpleLists.UnorderedLists, correctOrderForSimpleList, correctFormattedMessageForSimpleList],
            [Files.LinkedLists.UnorderedLists, correctOrderForLinkedList, correctFormattedMessageForLinkedList],
        ])('given file %s is passed', (markdownFile: string, correctOrder: string[][], expectedFormattedMessage: string[]) => {
            it('should return with errors', () => {
                var expected = {
                    'summary': 'Markdown list needs to be sorted', 
                    'errorObject': [
                        {
                            'type': 'LIST_ITEMS',
                            'message': 'Please correct the alphabetical order for these list items',
                            'details': correctOrder,
                        }
                    ]}
                const actual = lintMarkdownList(markdownFile)
                expect(actual).toMatchObject(expected);
            })

            it('should return correct formatted message', () => {
                const actual = lintMarkdownList(markdownFile)
                expect(actual.formattedMessage?.split('\n')).toMatchObject(expectedFormattedMessage);
            })
        })
    })    

    describe('given unordered headings and lists are tested', () => {
        const correctHeadingsOrder = [["D", "A", "B", "C"]]
        const correctListOrderForSimpleList = [['African Buffalo', 'Aardwolf'], ['Chameleon','Camel','Cheetah','Canary']]
        const correctListOrderForLinkedList = [
            [
                `[African Buffalo]('https://www.AfricanBuffalo.com')`,
                `[Aardwolf]('https://www.Aardwolf.com')`
            ],
            [
                `[Chameleon]('https://www.Chameleon.com')`,
                `[Camel]('https://www.Camel.com')`,
                `[Cheetah]('https://www.Cheetah.com')`,
                `[Canary]('https://www.Canary.com')`
            ]
        ]
        const correctFormattedMessageCommonHeaders = [
            'SUMMARY:',
            'Markdown list needs to be sorted',
            '',
            'DETAILS:',
            'Please correct the alphabetical order for these heading items',
            '\tSection #1',
            '\t\tD',
            '\t\tA',
            '\t\tB',
            '\t\tC',
            '',
            "Please correct the alphabetical order for these list items",
          ]
        const correctFormattedMessageForSimpleList = [
            ...correctFormattedMessageCommonHeaders,            
            '\tSection #1',
            '\t\tAfrican Buffalo',
            '\t\tAardwolf',
            '',
            '\tSection #2',
            '\t\tChameleon',
            '\t\tCamel',
            '\t\tCheetah',
            '\t\tCanary',
            '',
            '',
          ]
        const correctFormattedMessageForLinkedList = [
            ...correctFormattedMessageCommonHeaders,
            '\tSection #1',
            `\t\t[African Buffalo]('https://www.AfricanBuffalo.com')`,
            `\t\t[Aardwolf]('https://www.Aardwolf.com')`,
            '',
            '\tSection #2',
            `\t\t[Chameleon]('https://www.Chameleon.com')`,
            `\t\t[Camel]('https://www.Camel.com')`,
            `\t\t[Cheetah]('https://www.Cheetah.com')`,
            `\t\t[Canary]('https://www.Canary.com')`,
            '',
            '',
          ]
        const avc = ['']

        describe.each([
            [Files.SimpleLists.UnorderedListsAndHeadings, correctHeadingsOrder, correctListOrderForSimpleList, correctFormattedMessageForSimpleList],
            [Files.LinkedLists.UnorderedListsAndHeadings, correctHeadingsOrder, correctListOrderForLinkedList, correctFormattedMessageForLinkedList],
        ])('given file %s is passed', (markdownFile: string, correctHeadingsOrder: string[][], correctListOrder: string[][], expectedFormattedMessage: string[]) => {
            it('should return with errors', () => {
                var expected = {
                    'summary': 'Markdown list needs to be sorted', 
                    'errorObject': [
                        {
                            'type': 'HEADINGS',
                            'message': 'Please correct the alphabetical order for these heading items',
                            'details': correctHeadingsOrder,
                        },
                        {
                            'type': 'LIST_ITEMS',
                            'message': 'Please correct the alphabetical order for these list items',
                            'details': correctListOrder,
                        }
                    ]}
                const actual = lintMarkdownList(markdownFile)
                expect(actual).toMatchObject(expected);
            })

            it('should return correct formatted message', () => {
                const actual = lintMarkdownList(markdownFile)
                expect(actual.formattedMessage?.split('\n')).toMatchObject(expectedFormattedMessage);
            })
        })
    })    

    describe('given a non-existent file is passed', () => {
        it('should throw an error', () => {
            expect.assertions(1);
            try {
                lintMarkdownList('./this_file_does_not_exist.md')
            } catch (e: any) {
                expect(e.message).toBe("ENOENT: no such file or directory, open './this_file_does_not_exist.md'");
            }
        })
    })
})
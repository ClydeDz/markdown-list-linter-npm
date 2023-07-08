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
                expect(actual).toMatchObject({ 'summary': 'No errors found'})
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
                    ]}
                const actual = lintMarkdownList(markdownFile)
                expect(actual).toMatchObject(expected);
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

        describe.each([
            [Files.SimpleLists.UnorderedLists, correctOrderForSimpleList],
            [Files.LinkedLists.UnorderedLists, correctOrderForLinkedList],
        ])('given file %s is passed', (markdownFile: string, correctOrder: string[][]) => {
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

        describe.each([
            [Files.SimpleLists.UnorderedListsAndHeadings, correctHeadingsOrder, correctListOrderForSimpleList],
            [Files.LinkedLists.UnorderedListsAndHeadings, correctHeadingsOrder, correctListOrderForLinkedList],
        ])('given file %s is passed', (markdownFile: string, correctHeadingsOrder: string[][], correctListOrder: string[][]) => {
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
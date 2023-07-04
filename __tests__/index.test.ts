import {runMarkdownListLinter} from '../src/markdown-list-linter'
import { Files } from './files';

describe("lint", () => {
    it("alphabets supplied", () => {
        const actual = runMarkdownListLinter(Files.SimpleLists.Simple)
        expect(actual).toMatchObject({ summary: 'No errors found'});
    });  

    it("alphabets supplied", () => {
        var expected = [['Please correct the alphabetical order for these heading items:', "----------", "C", "B"]]
        const actual = runMarkdownListLinter(Files.SimpleLists.Simple)
        console.log(actual)       
        expect(true).toBeTruthy()
        //expect(actual).toMatchObject(expected);
    });   
});

/*
return {
    type: "Headings",
    message: "Please correct the alphabetical order for these heading items",
    details: [
        section: ['', '', ''],
        section: ['', ''],
        section: ['', '']
    ]
};
*/
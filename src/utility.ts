import { IMarkdownListLinterErrors } from "./interface";

var diff = require('json-differ');

export const getAllHeadings = (data:any) => {
    const result = data.reduce((accumulator:any, current:any) => {
        const [title] = current.slice(1);
        // @ts-ignore
        const added = accumulator.find(e => e === title);
        !added ? accumulator.push(title) : false;        
        return accumulator;
    }, []);
    return result;
}

export const getAllListItems = (data:any) => {
    const result = data.reduce((accumulator:any, current:any) => {
        const [item] = current.slice(2);
        accumulator.push(item)        
        return accumulator;
    }, []);
    return result;
}

export const sortItems = (data:any) => {
    const result = data.sort((a:any,b:any) => {
        return a.localeCompare(b)
    });
    return result;
}

export const compareJson = (original:any, sorted:any) => {
    var difference = diff(JSON.stringify({...sorted }), JSON.stringify({...original}))
    if(difference !== 'false') {
        return difference;
    }
}

export const formatHeadingErrors = (errors:any): IMarkdownListLinterErrors => {
    const jsonErrors = JSON.parse(errors)    
    var builder = '';
    Object.keys(jsonErrors).reduce((accumulator, curr) => {
        const added = accumulator.find(e => e === curr);
        // @ts-ignore
        !added ? accumulator.push(curr) : false;        

        if(accumulator[accumulator.length-2]) {
            const lastElement = accumulator[accumulator.length-2]
            // @ts-ignore
            if(curr - lastElement > 1) {
                builder += '&'
            }
        }
        builder += jsonErrors[curr] += ','
        return accumulator
    }, [])    

    return {
        type: "Headings",
        message: "Please correct the alphabetical order for these heading items",
        details: builder.split('&').map(function(x){
            return x.slice(0,-1).split(",")
        })
    };
}


export const formatListItemErrors = (errors:any): IMarkdownListLinterErrors => {
    const jsonErrors = JSON.parse(errors)
    var builder = '';
    Object.keys(jsonErrors).reduce((accumulator, curr) => {
        const added = accumulator.find(e => e === curr);
        // @ts-ignore
        !added ? accumulator.push(curr) : false;        

        if(accumulator[accumulator.length-2]) {
            const lastElement = accumulator[accumulator.length-2]
            // @ts-ignore
            if(curr - lastElement > 1) {
                builder += '&'
            }
        }
        builder += jsonErrors[curr] += ','
        return accumulator
    }, [])    
    
    return {
        type: "List items",
        message: "Please correct the alphabetical order for these list items",
        details: builder.split('&').map(function(x){
            return x.slice(0,-1).split(",")
        })
    };
}

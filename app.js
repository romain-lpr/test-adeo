const data = require('./data');

'use strict'

const args = process.argv

function isEmpty(arr) {
    return (Array.isArray(arr) && arr.length)
}

const validArgument = ['filter','--filter','count','--count', 'test', '--test']

// This function filters out every animal that does not match the string pattern
const removeNonMatching = (searchedStr, person) => {
    return person.animals.map((animal) => {
        if (animal.name.includes(searchedStr)) {
            return animal;
        }
    }).filter(e => e)
}

const filter = (searchedStr) => {
    const newList = data.filter(q => {
        let newCountry = q
        newCountry.people = q.people.filter(p => {
            let newPerson = p
            newPerson.animals = removeNonMatching(searchedStr, p)

            // The 'animals' entry will be removed if there is nothing left inside
            return isEmpty(newPerson.animals)
        })

        // The 'people' entry will be removed if there is nothing left inside
        return (isEmpty(newCountry.people))
    });

    // return the filtered list if there is any match
    return (!isEmpty(newList)) ? 'Nothing found' : newList
}

const count = (list) => {
    // recuperate all the data if no filtered list has been given
    const listToCount = list || data
    if(!Array.isArray(listToCount)){ // If the filtered list is empty, return Nothing found
        return 'Nothing found'
    }
    const newList = listToCount.map((country) => {
        country.people.map((person) => {
            person.name = `${person.name} [${person.animals.length}]`
            return person
        })
        country.name = `${country.name} [${country.people.length}]`
        return country
    })
    return newList
}

// USAGE: node app.js --filter=[PATTERN] OR node app.js filter=[PATTERN]
// USAGE: node app.js --count OR node app.js count
// USAGE: node app.js --filter=[PATTERN] --count OR node app.js filter=[PATTERN] --count OR node app.js --filter=[PATTERN] count OR node app.js filter=[PATTERN] count

try {
    let result
    const cmds = args.slice(2).map(cmd => cmd.split('='))
    const cmdNames = cmds.map(cmd => cmd[0])
    if(!cmds[0]){
        result = 'Arguments missing'
    } else if(!cmdNames.every(cmd => validArgument.includes(cmd))){
        result = 'Wrong arguments'
    } else {
        if(cmdNames.some((cmd => ['filter','--filter'].indexOf(cmd) !== -1))){
            const filteredPattern = cmds.filter(cmd => ['filter','--filter'].includes(cmd[0]))[0][1]
            result = filter(filteredPattern)
        }
        if(cmdNames.some((cmd => ['count','--count'].indexOf(cmd) !== -1))){
            result = count(result)
        }
        if(cmdNames.some((cmd => ['test', '--test'].indexOf(cmd) !== -1))){
            result = 'Test in progress'
        }
    }
    console.log(JSON.stringify(result))
} catch(err) {
    throw err
}


module.exports = {
    count, filter
}

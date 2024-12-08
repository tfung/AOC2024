const fs = require('fs');
const readline = require('readline');

const solver1 = (filePath) => {
    console.log('processing ' + filePath);

    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        output: process.stdout,
        terminal: false
    });

    let total = 0;

    rl.on('line', (line) => {
        total += getMultiplesTotalFromString(line);
    });

    rl.on('close', () => {
        console.log('total: ' + total);
    });
}

const solver2 = (filePath) => {
    // TODO: solve 2
    console.log('processing ' + filePath);

    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        output: process.stdout,
        terminal: false
    });

    let total = 0;

    rl.on('line', (line) => {
        let isDo = true;
        let remainingString = line.slice();
        
        while (remainingString) {
            if (isDo) {
                const [section, restOfSection] = remainingString.match(/[^|do\(\)](.*)don't\(\)(.*)/g)
                remainingString = restOfSection;

                console.log('section: ' + section);
                console.log('restOfSection: ' + restOfSection);

                total += getMultiplesTotalFromString(section);
                isDo = false;
            } else {
                const [section, restOfSection] = remainingString.match(/^(.*)do\(\)(.*)/g)

                console.log('section: ' + section);
                console.log('restOfSection: ' + restOfSection);

                remainingString = restOfSection;
                isDo = true;
            }
        }
    });

    rl.on('close', () => {
        console.log('total: ' + total);
    });
}

const getMultiplesTotalFromString = (string) => {
    const matches = string.match(/mul\(\d+,\d+\)/g)
    let total = 0;

    matches.forEach((match) => {
        total += mulStr(match);
    });

    return total;
}

const mulStr = (string) => {
    const [digit1, digit2] = string.match(/\d+/g);

    return digit1 * digit2;
}

const delegateSolver = (solverNumber, filePath) => {
    if (!filePath) {
        console.log('invalid filePath')
        return;
    }

    if (solverNumber === "1") {
        solver1(filePath);
        return;
    }

    if (solverNumber === "2") {
        solver2(filePath);
        return;
    }

    console.log("Invalid solver number:" + solverNumber);
}

delegateSolver(process.argv[2], process.argv[3])

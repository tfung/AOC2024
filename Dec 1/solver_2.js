const fs = require('fs');
const readline = require('readline');

const solver = (filePath) => {
    if (!filePath) {
        console.log('invalid filePath')
        return;
    }

    console.log('processing ' + filePath)

    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        output: process.stdout,
        terminal: false
    });

    const leftList = {};
    const rightList = {};

    // Process each line as it’s read
    rl.on('line', (line) => {
        const [leftToken, rightToken] = line.split(/\W+/).map(c => parseInt(c));

        leftList[leftToken] = !leftList[leftToken]
            ? 1
            : leftList[leftToken] + 1;

        rightList[rightToken] = !rightList[rightToken]
            ? rightToken
            : rightList[rightToken] + rightToken;
    });
    
    // Handle the end of the file
    rl.on('close', () => {
        console.log('Finished processing file!');

        let total = 0;

        for (let key in leftList) {
            if (rightList[key]) {
                total += (leftList[key] * rightList[key]);
            }
        }

        console.log(total);
    });
}

solver(process.argv[2])
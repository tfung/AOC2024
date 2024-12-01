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

    const leftList = [];
    const rightList = [];

    // Process each line as it’s read
    rl.on('line', (line) => {
        const [leftToken, rightToken] = line.split(/\W+/).map(c => parseInt(c));

        leftList.push(leftToken);
        rightList.push(rightToken);
    });
    
    // Handle the end of the file
    rl.on('close', () => {
        console.log('Finished processing file!');

        leftList.sort();
        rightList.sort();

        const listLength = leftList.length;
        let sum = 0;

        for (let i=0; i<listLength; i++) {
            sum += Math.abs(rightList[i]-leftList[i]);
        }

        console.log(sum);
    });
}

solver(process.argv[2])
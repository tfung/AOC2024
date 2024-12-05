const fs = require('fs');
const readline = require('readline');

const solver1 = (filePath) => {
    console.log('processing ' + filePath);

    const fileStream = fs.createReadStream(filePath);

    let safeReports = 0;

    const rl = readline.createInterface({
        input: fileStream,
        output: process.stdout,
        terminal: false
    });

    rl.on('line', (line) => {
        const reports = line.match(/\d+/g).map((strInt) => parseInt(strInt))

        if (isReportSafe(reports)) {
            safeReports++;
        }
    });

    rl.on('close', () => {
        console.log('safeReports: ' + safeReports);
    });
}

const solver2 = (filePath) => {
    console.log('processing ' + filePath);

    const fileStream = fs.createReadStream(filePath);

    let safeReports = 0;

    const rl = readline.createInterface({
        input: fileStream,
        output: process.stdout,
        terminal: false
    });

    rl.on('line', (line) => {
        const reports = line.match(/\d+/g).map((strInt) => parseInt(strInt))

        if (isReportSafe(reports)) {
            safeReports++;
        } else if (isReportSafeWithDampener(reports)) {
            safeReports++;
        }
    });

    rl.on('close', () => {
        console.log('safeReports: ' + safeReports);
    });
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

const isReportSafe = (reports) => {
    return isIncreasingReports(reports) || isDecreasingReports(reports);
}

const isReportSafeWithDampener = (reports) => {
    for (let i=0; i<reports.length; i++) {
        const dampenedReports = [...reports.slice(0,i), ...reports.slice(i+1)];

        if (isReportSafe(dampenedReports)) {
            return true;
        }
    }

    return false;
}

const isIncreasingReports = (reports) => {
    for (let i=1; i<reports.length; i++) {
        const report1 = reports[i-1];
        const report2 = reports[i];

        if (report1 >= report2 || report2 - report1 > 3) {
            return false;
        }
    }

    return true;
}

const isDecreasingReports = (reports) => {
    for (let i=1; i<reports.length; i++) {
        const report1 = reports[i-1];
        const report2 = reports[i];

        if (report1 <= report2 || report1 - report2 > 3) {
            return false;
        }
    }

    return true;
}

delegateSolver(process.argv[2], process.argv[3])

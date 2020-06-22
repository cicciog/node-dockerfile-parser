const fs = require("fs");


exports.csvToArray = (pFilename) => {
    let csvContents = fs.readFileSync(pFilename, {encoding: 'utf8'});
    let lines = csvContents.toString().split("\n");
    let dockersArray = [];

    for (let i = 0; i < lines.length; i++) {
        let element = lines[i].toString().split(',');
        dockersArray.push({
            name: element[0],
            buildcommand: element[1].replace('docker build -t ', '')
                    .replace(element[0], '')
                    .replace('.\r', 'Dockerfile')
                    .trim()
        });
    }
    return dockersArray;
};

exports.readDockerfile = (pPath) =>{
    let file = fs.readFileSync(pPath, {encoding: 'utf8', flag: 'r'});
    return file.toString();
};


exports.createJson = (pDockerName, pCommands) =>{
    let object = {}; // empty Object
    let key = 'docker';
    object[key] = []; // empty Array, which you can push() values into 

    for (let i = 0; i < pCommands.length; i++) {
        object[key].push(pCommands[i]);
    }

// stringify JSON Object
    let jsonContent = JSON.stringify(object);
    console.log(jsonContent);

    fs.writeFile('../../output/' + pDockerName + '.json', jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
};



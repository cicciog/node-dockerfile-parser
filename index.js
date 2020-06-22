const fs = require("fs");
const parser = require('docker-file-parser');
const options = {includeComments: false};
const repositories = "/home/francesco/Documenti/repositories";
const dockerFileManager = require('../node-dockerfile-parser/dockerFileManager');


// Display the file data 
//console.log(dockerfile);

let dockerImage = [];
let dockerfile = {};

dockerImage = dockerFileManager.csvToArray('DokerBuildImagesCmd.csv');

for (let i = 0; i < dockerImage.length; i++) {
    console.log(dockerImage[i].name.split('.').join('-'));
    dockerfile = dockerFileManager.readDockerfile(repositories + dockerImage[i].buildcommand.split('\\').join('/'));
    commands = parser.parse(dockerfile, options);
    console.log(commands);

    dockerFileManager.createJson(dockerImage[i].name, commands);
}







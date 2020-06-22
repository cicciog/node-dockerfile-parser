const fs = require('fs');
const mocha = require('mocha');
const assert = require('assert');
const dockerFileManager = require('../dockerFileManager');
const repositories = "/home/francesco/Documenti/repositories";
const options = {includeComments: false};
const parser = require('docker-file-parser');


describe("Unit Test 1", function () {
    
    it("should be able to verify the array length", function () {
        var images = dockerFileManager.csvToArray('../DokerBuildImagesCmd.csv');
        
        assert.equal(images.length > 0,true,'array contains a number o element greater than 0');
    });
});

describe("Unit Test 2", function () {
    
    it("should be able to verify the array length", function () {
        var images = dockerFileManager.csvToArray('../DokerBuildImagesCmd.csv');
        dockerfile = dockerFileManager.readDockerfile(repositories + images[1].buildcommand.split('\\').join('/'));
        assert.equal(dockerfile.length > 0,true,'dockerfile contains all lines of the file specified');
    });
});

describe("Unit Test 3", function () {
    
    it("should be able to verify if a generated json file exist", function () {
        var images = dockerFileManager.csvToArray('../DokerBuildImagesCmd.csv');
        var dockerfile = dockerFileManager.readDockerfile(repositories + images[1].buildcommand.split('\\').join('/'));
        var commands = parser.parse(dockerfile,options);
        dockerFileManager.createJson(images[1].name,commands);
        assert.equal(fs.existsSync('../../output/'+images[1].name+'.json'),true,'the file '+images[1].name+' exist');
        fs.unlinkSync('../../output/'+images[1].name+'.json');
    });
});

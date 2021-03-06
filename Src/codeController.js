const writeFile = require("./writeToFile.js");
const compileCode  = require("./compileCode.js");
const runCode = require("./runCode.js");

let count = 0;

module.exports.handleCPlusPlus = async function(req,res) {
    console.log("Starting for C++");
  
    let id = ++count;

    await writeFile.writeCodeToFile(req.body.code, './codeFiles/' + id + '.cpp');

    let compileResult = await compileCode.compileCPlusPlus(id);


    console.log("Compile Result: " + compileResult.status);
    let reqOutput;

    if(compileResult.status){

    let codeOutput = await runCode.runExe(req.body.input, id);

    if(codeOutput.status){
        reqOutput = {
        Code_Compiled: compileResult.status,
        codeStatus: codeOutput.status,
        output: `${codeOutput.output}`,
        }
    }else{
        reqOutput = {
        Code_Compiled: compileResult.status,
        codeStatus: codeOutput.status,
        error: "Code timed out",
        }
    }


    }else{
    reqOutput = {
        Code_Compiled: compileResult.status,
        error: compileResult.output,
    }
    }

    return res.send(reqOutput);
}

module.exports.handleC = async function(req,res) {
    console.log("Starting for C");
  
    let id = ++count;

    await writeFile.writeCodeToFile(req.body.code, './codeFiles/' + id + '.c');

    let compileResult = await compileCode.compileC(id);


    console.log("Compile Result: " + compileResult.status);
    let reqOutput;

    if(compileResult.status){

    let codeOutput = await runCode.runExe(req.body.input, id);

    if(codeOutput.status){
        reqOutput = {
        Code_Compiled: compileResult.status,
        codeStatus: codeOutput.status,
        output: `${codeOutput.output}`,
        }
    }else{
        reqOutput = {
        Code_Compiled: compileResult.status,
        codeStatus: codeOutput.status,
        error: "Code timed out",
        }
    }


    }else{
    reqOutput = {
        Code_Compiled: compileResult.status,
        error: compileResult.output,
    }
    }

    return res.send(reqOutput);
}

module.exports.handlePython = async function(req,res) {
    console.log("Starting for Python");
  
    let id = ++count;

    await writeFile.writeCodeToFile(req.body.code, './codeFiles/' + id + '.py');

    let reqOutput;

    let codeOutput = await runCode.runPythonScript(req.body.input, './codeFiles/' + id + '.py');

    if(codeOutput.status){
        reqOutput = {
        codeStatus: codeOutput.status,
        output: `${codeOutput.output}`,
        }
    }else{
        reqOutput = {
        codeStatus: codeOutput.status,
        error: codeOutput.output,
        }
    }

    return res.send(reqOutput);
}

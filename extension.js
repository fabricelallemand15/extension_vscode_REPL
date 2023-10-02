const vscode = require('vscode');
const path = require('path');

function activate(context) {
    // Register a command that executes the active python file in the interactive console
    let runPythonFile = vscode.commands.registerCommand('extension.runPythonFile', function () {
        // Get the active text editor
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            // Get the file name
            let fileName = editor.document.fileName;
            // Get the file base name without extension
            let fileBaseName = path.basename(fileName, '.py');
            // Get the file directory
            let fileDir = path.dirname(fileName);
            // Save the file
            editor.document.save();
            // Create a terminal
            let terminal = vscode.window.createTerminal('Python Interactive');
            // Send the command to the terminal
            terminal.sendText(`python -i -c "from ${fileBaseName} import *"`);
            // Show the terminal
            terminal.show();
        }
    });

    // Add the command to the context
    context.subscriptions.push(runPythonFile);
}

exports.activate = activate;

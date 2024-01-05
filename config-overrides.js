const { override, addBabelPlugins } = require("customize-cra");

const path = require("path");


module.exports = override(
    addBabelPlugins(
        [path.resolve(__dirname, "./babel-test-plugin"), {
            "ide": "vscode",
            "memes": [{
                literal: "Never gonna give you up",
                value: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG0YHemFSIWQmQ0K3BgH2Y8RmDxzyRSpMH1uaux47evQ&s"
            },
                {
                    literal: "Name",
                    value: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKNMinu4PsLAKzuav3otZx0-_rn-73Q2vUOAlWLzISvLJj_cKOi6Kj6WXHXaCJo4GlYSk&usqp=CAU"
            }]
        }]
    )
)
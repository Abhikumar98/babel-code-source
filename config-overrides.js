const { override, addBabelPlugins } = require("customize-cra");

const path = require("path");


module.exports = override(
    addBabelPlugins(
        [path.resolve(__dirname, "./babel-test-plugin"), {
            "ide": "vscode",
            "memes": [{
                literal: "Never gonna give you up",
                value: "https://hello.co"
            },
                {
                    literal: "Name",
                    value: "https://bhupendrajogi.com"
            }]
        }]
    )
)
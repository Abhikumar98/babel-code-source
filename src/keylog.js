// document.addEventListener('keydown', function (event) {
//     if (event.key === "Alt") {
//         console.log("Alt pressed")
//     }
// })

document.addEventListener("mousedown", function (event) {
    if (event.altKey) {
        const element = event.target;

        const attribute = element.getAttribute("data-source");

        if (attribute) {
            const [filename, line, column] = attribute.split(":");
            
            if (filename && line && column) {
                const url = `vscode://file/${filename}:${line}:${column}`;
                window.open(url, "_blank");
            }

        }
    }
})
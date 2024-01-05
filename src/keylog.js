let activeMeme = null;

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

document.addEventListener("mousemove", function (event) {
    const element = event.target;

    console.log(event.clientX, event.clientY)

    const attribute = element.getAttribute("data-meme");

    if (element.style) {
        
        element.style.cursor = attribute ? "grab" : "auto";
    }

    console.log({ attribute })

    if (activeMeme && attribute) {

        if (activeMeme.src !== attribute) {
            activeMeme.src = attribute;
        }

        activeMeme.style.top = `${event.clientY}px`;
        activeMeme.style.left = `${event.clientX}px`;
    }
    else if (attribute) {
        // open a popover and show the image in img tag
        const img = document.createElement("img");
        img.id = "active-meme";
        img.src = attribute;
        img.style.position = "absolute";
        img.style.top = `${event.clientY}px`;
        img.style.left = `${event.clientX}px`;
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.border = "2px solid black";
        img.style.borderRadius = "5px";
        img.style.backgroundColor = "white";
        img.style.padding = "5px";
        img.style.zIndex = "1000";

        activeMeme = img;

        document.body.appendChild(activeMeme);
    } else {
        if (activeMeme) {
            activeMeme.remove();
            activeMeme = null;
        }
    }

})
import "./index";
import {createElementFromString} from "./utils";

const { body } = window.document;

let testButton = createElementFromString("<button class=\"test-button\">Click</button>");

testButton.addEventListener("click", (ev) => {
    (window as any)["showOverLay"]()
});

body.appendChild(testButton);
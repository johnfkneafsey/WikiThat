
const bkg = chrome.extension.getBackgroundPage();

let tester = "THIS IS LOCAL POPUPJS"; 
let hello;

chrome.tabs.executeScript(null,{
    code:"window.getSelection().toString();"
})

console.log(hello);


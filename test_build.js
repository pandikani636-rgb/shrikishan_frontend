const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'build', 'index.html'), 'utf8');

const dom = new JSDOM(indexHtml, {
  url: "http://localhost:5000/home",
  runScripts: "dangerously",
  resources: "usable"
});

dom.window.console.error = (...args) => {
    console.error("REACT ERROR:", ...args);
};

dom.window.addEventListener("error", (event) => {
    console.error("UNCAUGHT EXCEPTION:", event.error);
});

// Load the local script files manually since jsdom might not fetch them correctly from a fake server
const scripts = Array.from(dom.window.document.querySelectorAll('script[src]'));
for (const script of scripts) {
    const src = script.src;
    if (src.startsWith('/static/js/')) {
        const filePath = path.join(__dirname, 'build', src);
        if (fs.existsSync(filePath)) {
            const code = fs.readFileSync(filePath, 'utf8');
            const el = dom.window.document.createElement('script');
            el.textContent = code;
            dom.window.document.body.appendChild(el);
        }
    }
}

setTimeout(() => {
    console.log("Root content:", dom.window.document.getElementById('root').innerHTML.substring(0, 200));
    console.log("Done testing");
    process.exit(0);
}, 3000);

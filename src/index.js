
import { navbar_render } from "./navbar.js";

let navbar_test = document.querySelector('.navbar');
let nodes = navbar_render();
console.log(`from index.js ${nodes}`)
nodes.forEach(node => {
    navbar_test.appendChild(node);
});

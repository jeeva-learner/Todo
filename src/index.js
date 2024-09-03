
import { navbar_render } from "./navbar.js";
/* Global variables */
const navbar_main_contents = { 
"navbar_main_section"    : [['div','navbar_header','Dashboard'],
                            ['div','navbar_default'],
                            ['div','project_container',undefined]],
"navbar_default_section" : [['p','home','Home'],
                            ['p','today','Today'],
                            ['p','tomorrow','Tomorrow'],
                            ['p','week','Week'],
                            ['p','completed','Completed']],
"navbar_project_section" : [['div','project_list',undefined]],
"navbar_project_container":[['div','project_section','Project'],
                            ['button', 'new_project','+']]};
/* */

/* Render Functions */
function render_function(parent_element,iterator){
    iterator.forEach(node=>{
        if (node instanceof Node){
            parent_element.appendChild(node);
        }
        else{
            console.error("Invalid node detected: ",node);
        }
    })
}
/* */

const navbar_nodes = navbar_render(navbar_main_contents);
let navbar = document.querySelector('.navbar');
console.log(navbar_nodes);
render_function(navbar,navbar_nodes);


import { navbar_render,new_project_name_dialog, new_prj_name, navbar_project_name_render} from "./navbar.js";
import { local_storage_json } from "./localstorage.js";
import { contentarea_initial_render as content, input_dialog_creator as to_do_item } from "./content_area.js";
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

function project_name_export(project_name){
    const return_object = {
        project_name: project_name
    };
    return return_object;
}

(()=>{
    const navbar_nodes = navbar_render(navbar_main_contents);
    let navbar = document.querySelector('.navbar');
   // console.log(navbar_nodes);  // Debugging purpose
    render_function(navbar,navbar_nodes);
    // New Project Div handler starting place
    const new_project_entry = document.querySelector('.new_project');
    // The below code is to persist across page reloads if data already present in 
    // local_stoarage_json and it will render those
    if (Object.keys(local_storage_json).length > 0) {
        // Iterate over the projects stored in local_storage_json
        Object.keys(local_storage_json).forEach((project_name) => {
            // Render each project in the navbar
            navbar_project_name_render(project_name);
        });
    }
    // this ends the above block
    new_project_entry.addEventListener('click',()=>{
    new_project_name_dialog();
    const new_prj_dialog = document.querySelector('dialog.project_name');
    new_prj_dialog.showModal();
    document.querySelector('.project_name_confirm').addEventListener('click',()=>{
        let valid_input = document.getElementById('project_name_id').value;
        if(!valid_input.match(/^[A-Za-z0-9]+$/)){
            alert("Project name should be a single word consists of Alpha Numeric !");
            document.getElementById('project_name_id').value = "";
            new_prj_dialog.close();
            return; // This is to prevent alert being triggered multiple times
        }
        else{
            new_prj_name(project_name_export(valid_input));
            // Usually if the button type is submit and it is in a form then submit action to be handled
            document.getElementById('project_name_id').value = "";
            new_prj_dialog.close();
        }
    },{ once: true });  // once : true - this is added to make sure the event listner doesn't stack up and added only once !
    document.querySelector('.project_name_cancel').addEventListener('click',()=>{
        document.getElementById('project_name_id').value = "";
        new_prj_dialog.close();
    });
});

//content area//

const content_area = document.querySelector('.content_area')
const default_content_layout = content();
content_area.appendChild(default_content_layout);

to_do_item()
})();


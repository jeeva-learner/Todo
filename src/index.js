
import { navbar_render,new_project_name_dialog, new_prj_name} from "./navbar.js";
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

})();


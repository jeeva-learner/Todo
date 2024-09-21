import { local_storage_json as ls, saveToLocalStorage} from "./localstorage.js";
import './style.css';
/* 
 Function: initial_navbar_render
*/
function initial_navbar_render(array){
    let created_node_list = [];
    array.forEach(([element,class_name,text_to_be_displayed = undefined])=>{
        let new_element = document.createElement(element);
        new_element.classList.add(class_name);
        if(text_to_be_displayed != undefined){
        new_element.textContent = text_to_be_displayed;}
        created_node_list.push(new_element)
    })
    return created_node_list;
}

function navbar_render(contents){
    const main_section = initial_navbar_render(contents['navbar_main_section']);
    const default_section = initial_navbar_render(contents['navbar_default_section']);
    const project_secion = initial_navbar_render(contents['navbar_project_section']);
    const project_add_button = initial_navbar_render(contents['navbar_project_container']);
    // main_navbar_node_list = main_section[1].concat(default_section);  // logged out because concat doesn't work on DOM main_selection contains the 
    // main_navbar_node_list = main_section[2].concat(project_secion);   // return array from initial_navbar_render, but main_selction[i] is an dom
    main_section[1].append(...default_section);
    const nested_project_container = main_section.find(element => element.classList.contains('project_container')); // Nested dom element can be found only by find function
    nested_project_container.append(...project_add_button);
    main_section[2].append(...project_secion);
    
    return main_section;
}

function dom_element_creator(element, class_name = undefined, id_name = undefined,text_to_be_displayed = undefined){
    const new_element = document.createElement(element);
    if (class_name){
        new_element.classList.add(class_name);
    }
    if(id_name){
        new_element.id = id_name;
    }
    if(text_to_be_displayed){
        new_element.textContent = text_to_be_displayed;
    }
    return new_element;
}

function attribute_setter(element,attribute,attribute_value){
    return element.setAttribute(attribute,attribute_value);
}

function new_project_name_dialog(){
    let project_name_input_handler            = dom_element_creator('dialog','project_name');
    let input_conatier                        = dom_element_creator('div','lable_input_vertical');
    let input_label                           = dom_element_creator('label',undefined);
    let input_handle                          = dom_element_creator('input',undefined,'project_name_id');
    input_handle.placeholder                  = "Enter Your Project Name";
    input_label.htmlFor                       = 'project_name_id';
    input_conatier.append(input_handle,input_label);
    let button_conatiner                      = dom_element_creator('div','project_name_button');
    let button_confirm                        = dom_element_creator('button','project_name_confirm',undefined,'Create');
    let button_cancel                         = dom_element_creator('button','project_name_cancel',undefined,'Cancel');
    attribute_setter(button_confirm,'type','button');
    attribute_setter(button_cancel,'type','button');
    button_conatiner.append(button_confirm,button_cancel);
    project_name_input_handler.append(input_conatier,button_conatiner);
    document.body.appendChild(project_name_input_handler);
}

function project_name_addition_in_local_storage(obj){
    // console.log(obj['project_name']) // Project name
    if(ls[obj['project_name']]){
        alert('Project exsists with same name, please provide new name');
        return;
    }
    {
        ls[obj['project_name']] = {};
        navbar_project_name_render(obj['project_name']);
        saveToLocalStorage();
    }
    // console.log(ls)
}

function navbar_project_name_render(project_name){
    const project_name_handler        = dom_element_creator('div','navbar_project_container');
    const project_delete_button       = dom_element_creator('button','navbar_project_remove',undefined,'-');
    const project_name_display        =  dom_element_creator('div','navbar_project_name',undefined,project_name);
    project_name_display.setAttribute('title',project_name);
    project_delete_button.addEventListener('click', (e) => {
        // The below closet searches for the class name from itself then it's above ancestors
        const project_to_remove = e.target.closest('.navbar_project_container');
        project_name_removal(project_to_remove.firstChild.textContent);
        project_to_remove.remove();
    });
    project_name_handler.append(project_name_display,project_delete_button);
    const project_list                = document.querySelector('.project_list');
    project_list.appendChild(project_name_handler);
    return 1;
}

function project_name_removal(current_prj_name){
    if(current_prj_name in ls){
    delete ls[current_prj_name];
    saveToLocalStorage();
    }
    else{
        alert('No such project exsist');
    }
};

export {navbar_render,new_project_name_dialog, project_name_addition_in_local_storage as new_prj_name, navbar_project_name_render}


/* 
 Function: dom_element_creator
*/
function dom_element_creator(array){
    let created_node_list = [];
    array.forEach(([element,class_name,text_to_be_displayed])=>{
        let new_element = document.createElement(element);
        new_element.classList.add(class_name);
        if(text_to_be_displayed != undefined){
        new_element.textContent = text_to_be_displayed;}
        created_node_list.push(new_element)
    })
    return created_node_list;
}

function navbar_render(contents){
    const main_section = dom_element_creator(contents['navbar_main_section']);
    const default_section = dom_element_creator(contents['navbar_default_section']);
    const project_secion = dom_element_creator(contents['navbar_project_section']);
    const project_add_button = dom_element_creator(contents['navbar_project_container']);
    // main_navbar_node_list = main_section[1].concat(default_section);  // logged out because concat doesn't work on DOM main_selection contains the 
    // main_navbar_node_list = main_section[2].concat(project_secion);   // return array from dom_element_creator, but main_selction[i] is an dom
    main_section[1].append(...default_section);
    const nested_project_container = main_section.find(element => element.classList.contains('project_container')); // Nested dom element can be found only by find function
    nested_project_container.append(...project_add_button);
    main_section[2].append(...project_secion);
    
    return main_section;
}

export {navbar_render}

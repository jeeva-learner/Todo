
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
    console.log(created_node_list)
    return created_node_list;
}

function navbar_render(){
    let main_navbar_node_list = [];
    const navbar_main_contents = {  "navbar_main_section"    : [['div','navbar_header','Dashboard'],
                                                                ['div','navbar_default'],
                                                                ['div','project_section','Project']],
                                    "navbar_default_section" : [['p','home','Home'],
                                                                ['p','today','Today'],
                                                                ['p','tomorrow','Tomorrow'],
                                                                ['p','week','Week'],
                                                                ['p','completed','Completed']],
                                    "navbar_project_section" : [['div',undefined,undefined]]};
    for(let i in navbar_main_contents){
       let temp_node = dom_element_creator(navbar_main_contents[i]);
        main_navbar_node_list.concat(temp_node);
    };
    console.log(`from render function ${main_navbar_node_list}`)
    return main_navbar_node_list;
}

export {navbar_render}

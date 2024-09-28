/////////////////////Package Import area////////////////////////////////
import { local_storage_json as ls, saveToLocalStorage as save} from "./localstorage";
import * as date from "date-fns";
///////////////////////////////////////////////////////////////////////

////////////////Functional Logic//////////////////////////////////////
class todo{
    constructor(title,description,due_date,priority,completed){
        this.title       = title;
        this.description = description;
        this.due         = due_date;
        this.priority    = priority;
        this.completed   = completed;
    }
}

function to_do_cnrm(){
    let current_project  =  document.querySelector('.current_name_display h3').textContent;
    let values = dialog_value_extactor();
    json_value_append(ls[current_project], values);
    save();
    to_do_cncl();
}

function to_do_cncl(){
    document.getElementById('summary_label').value   =  '';
    document.getElementById('completed').checked     =  '';
    document.getElementById('due_date').value        =  '';
    document.getElementById('priority').value        =  '';
    document.getElementById('description').value     =  '';
    let input_dialog = document.querySelector('.to_do_input');
    input_dialog.close();
}
//////////////////////////////////////////////////////////////////////

////////////////////////Re-Use Code Snippets /////////////////////////

function json_value_append(parent,object){
   if(object.title in parent){
    alert('The To-Do Item already exsists')
   }
   else{
    parent[object.title] = object
   }
}

function dialog_value_extactor(){
    let title, description, due, pri, status;
    title            = document.getElementById('summary_label').value;
    status           = document.getElementById('completed').checked;
    due              = document.getElementById('due_date').value;
    pri              = document.getElementById('priority').value;
    description      = document.getElementById('description').value;
    let new_object   = new todo(title,description,due,pri,status);
    return new_object;
}

function create_dom_element(element,class_name = undefined,id_name = undefined){
    let new_element = document.createElement(element);
    if(class_name){
        new_element.classList.add(class_name)
    }
    if(id_name){
        new_element.id = id_name;
    }
    return new_element;
}

function add_additioal_class_name(element,class_name){
    element.classList.add(class_name);
    return element;
}

function text_content(element,text_to_be_displayed){
    element.textContent = text_to_be_displayed;
    return element;
}

function set_attribute(element,type,value){
    element.setAttribute(type,value);
    return element; // Does this return statement has any use case ?
}
/////////////////////////////////////////////////////////////////////

////////////////// Block-Creators ///////////////////////////////////

function input_dialog_creator(){
    let input_dialog                 = create_dom_element('dialog','to_do_input');
    let summary_label                = create_dom_element('label');
    let summary_input                = create_dom_element('input',undefined,'summary_label');   
    summary_label.htmlFor            = 'summary_label';
    summary_label                    = text_content(summary_label,'Summary');
    set_attribute(summary_input,'input','text');
    set_attribute(summary_input,'placeholder','Summary should be less than 250 words');
    set_attribute(summary_input,'minlength','5');
    set_attribute(summary_input,'maxlength','255'); 
    let due_date_label                     = create_dom_element('label');
    let due_date_input                     = create_dom_element('input',undefined,'due_date');   
    due_date_label.htmlFor                 = 'due_date';
    due_date_label                         = text_content(due_date_label,'Due')
    set_attribute(due_date_input,'type','date');
    let priority_label                     = create_dom_element('label');
    let priority_input                     = create_dom_element('select',undefined,'priority');   
    priority_label.htmlFor                 = 'Priority';
    priority_label                         = text_content(priority_label,'Priority')
    for(let i=0;i<5;i++){
        let temp_value   = create_dom_element('option');
        temp_value.value = i;
        priority_input.appendChild(text_content(temp_value,i));
    }
    set_attribute(priority_input,'name','priority');
    let is_completed_label                  = create_dom_element('label');
    let is_completed_input                  = create_dom_element('input',undefined,'completed');
    is_completed_label.htmlFor              = 'completed';
    is_completed_label                      = text_content(is_completed_label,'Done');
    set_attribute(is_completed_input,'type','checkbox');
    let desc_label                         = create_dom_element('label');
    desc_label                             = text_content(desc_label,'Description');
    let desc_input                         = create_dom_element('textarea',undefined,'description');
    desc_input.setAttribute('style','resize:None')
    desc_label.htmlFor                     = 'description';

    let btn_ctnr    =  create_dom_element('div',undefined,'to_do_buttons');
    let btn_cnfrm   =  create_dom_element('button',undefined,'to_do_confirm');
    let btn_cncl    =  create_dom_element('button',undefined,'to_do_cancel');
    btn_cnfrm       =  text_content(btn_cnfrm,"Save");
    btn_cncl        =  text_content(btn_cncl,"Cancel");
    btn_cnfrm.addEventListener('click',to_do_cnrm);
    btn_cncl.addEventListener('click',to_do_cncl);
    btn_ctnr.append(btn_cnfrm,btn_cncl);
    input_dialog.append(summary_label, summary_input, due_date_label, due_date_input,
                        priority_label, priority_input, is_completed_label, is_completed_input,
                        desc_label, desc_input,btn_ctnr);
    document.querySelector('.content_area').appendChild(input_dialog);
}

////////////////////////////////////////////////////////////////////

////////////////////Rendering Logic///////////////////////////////////

function contentarea_initial_render(){
    const content_area_container = document.createElement('div');
    const current_name_display   = document.createElement('div');
    const current_proj_content   = document.createElement('div')
    const current_proj_new_item  = document.createElement('button');
    current_proj_new_item.textContent = '+';
    content_area_container.classList.add('contnet_area_container');
    current_name_display.classList.add('current_name_display');
    current_proj_content.classList.add('current_proj_content');
    current_proj_new_item.classList.add('current_proj_new_item');
    current_proj_new_item.addEventListener('click',new_item_input);
    content_area_container.append(current_name_display, current_proj_content, current_proj_new_item);
    return content_area_container;
};

function current_project(project_name){
    const current_project_name = document.createElement('h3');
    const current_name_display = document.querySelector('.current_name_display');
    current_name_display.textContent = '';
    current_project_name.textContent = project_name;
    current_name_display.appendChild(current_project_name);
}

function new_item_input(){
    let current_project = document.querySelector('.current_name_display h3');
    if(!current_project || current_project.textContent.trim() === '')
    {
        alert('Please select a project');
    }
    else if(!(current_project.textContent in ls))
    {
        alert('Please select user defined project');
    }
    else
    {
        let input_dialog = document.querySelector('.to_do_input');
        input_dialog.showModal();
    }
}
//////////////////////////////////////////////////////////////////////

////////////////////////Export contents////////////////////////////////

export {contentarea_initial_render, current_project, input_dialog_creator}

//////////////////////////////////////////////////////////////////////

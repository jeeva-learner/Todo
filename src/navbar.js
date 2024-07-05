// create important task function
// Create newproject function

const default_navbar = function(){
    const important_tab = document.createElement('div');
    const alltasks = document.createElement('div');
    const today = document.createElement('div');
    const thisweek = document.createElement('div');
    const priority = document.createElement('div');
    important_tab.classList.add('important');
    alltasks.classList.add('all-tasks');
    today.classList.add('today-task');
    thisweek.classList.add('thisweek-task');
    priority.classList.add('priority-task');
    return [important_tab,alltasks,today,thisweek,priority]
}

const append_default_navbar = function(tabs){
    const default_tabs = document.createElement('div');
    default_tabs.classList.add('default-tabs');
    tabs.forEach((item)=>{
        default_tabs.append(item);
    })
    return default_tabs
}

const render_default_navbar = function(){  // to be handled in css later
    if (!important_task()){
        const tabs = default_navbar();
        tabs = tabs.splice(0,1);
        return append_default_navbar(tabs);
    }
    else if(important_task()){
        const tabs = default_navbar();
        return append_default_navbar(tabs);
    }
}

const proj_navbar = function(){
    const projnavbar = document.createElement('div');
    projnavbar.classList.add('project-navbar');
    const add_prj = document.createElement('button');
    add_prj.setAttribute('type','button');
    const plus_btn = document.createElement('img');
    plus_btn.setAttribute('src','./assets/project_add.png');
    add_prj.appendChild(plus_btn);
    projnavbar.appendChild(add_prj)
}

const proj_name_entry_div = function(){
    const wip_outer_body = document.createElement('div');
    wip_outer_body.classList.add('wip-project-name');
    const proj_name_input = document.createElement('input');
    proj_name_input.id = "wip-proj-name";
    proj_name_input.setAttribute('type','text');
    proj_name_input.setAttribute('placeholder','new proj name');
    proj_name_input.setAttribute('name','Project_Name');
    const wip_prj_cnfrm = document.createElement('button');
    const wip_prj_abrt = document.createElement('button');
    wip_prj_cnfrm.setAttribute('type','button');
    wip_prj_abrt.setAttribute('type','button');
    wip_prj_cnfrm.classList.add('wip-proj-cnfrm-button', 'wip-button')
    wip_prj_abrt.classList.add('wip-proj-abrt-button', 'wip-button')
    const ok_img = document.createElement('img');
    const del_img = document.createElement('img');
    ok_img.setAttribute('src','./assets/prj_name_ok.png');
    del_img.setAttribute('src','./assets/prj_name_del.png');
    wip_prj_cnfrm.appendChild(ok_img);
    wip_prj_abrt.appendChild(del_img);
    wip_outer_body.append(proj_name_input,wip_prj_cnfrm,wip_prj_abrt)
    return wip_outer_body;
}

const proj_name_entry = function(){
    const projnavbar = document.querySelector('.project-navbar');
    const wip = proj_name_entry_div();
    projnavbar.appendChild(wip);
}

const proj_ok = function(){
    const projnavbar = document.querySelector('.project-navbar');
    const wip_prj = document.querySelector('.wip-project-name');
    const new_prj_name = wip_prj.querySelector('input').value;
    newproject(new_prj_name);  // To create
    // project name to be passed to object-containing all projects 
    projnavbar.removeChild(wip_prj);
    // rendering to be handled here
}

const proje_abrt = function(){
    const projnavbar = document.querySelector('.project-navbar');
    const wip_prj = document.querySelector('.wip-project-name');
    projnavbar.removeChild(wip_prj);
}
// create important task function

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

const render_default_navbar = function(){
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
    const add_prj = document.createElement('button');
    add_prj.setAttribute('type','button');
    const plus_btn = document.createElement('img');
    plus_btn.setAttribute('src','./assets/project_add.png');
    add_prj.appendChild(plus_btn);
    projnavbar.appendChild(add_prj)
}
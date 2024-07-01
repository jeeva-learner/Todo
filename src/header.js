// This file will handle both user interaction as well as functional

import { format, formatDistance, formatRelative, subDays } from 'date-fns'

const pagename = function(){
    const appname = document.createElement('div');
    appname.classList.add('logo')
    appname.textContent = "To-do";
    return appname;
}

const datedisplay = function(){
    const dtedspy = document.createElement('div');
    dtedspy.classList.add('date-display');
    const dtelogo = document.createElement('img')
    dtelogo.setAttribute('src','./assets/calender.png');
    const dtelve = document.createElement('div');
    const currdate = new Date();
    dtelve.textContent = format(currdate,'d-L-YY');
    dtelve.classList.add('livedate');
    dtedspy.append(dtelogo,dtelve);
    return dtedspy
}

const timedisplay = function(){
    const tmedspy = document.createElement('div');
    tmedspy.classList.add('time-display');
    const tmelogo = document.createElement('img')
    tmelogo.setAttribute('src','./assets/clock.png')
    const currtime = new Date();
    const tmelve = document.createElement('div');
    tmelve.classList.add('livetime');
    tmelve.textContent = format(currtime, 'h-m a..aa')
    tmedspy.append(tmelogo,tmelve);
    return tmedspy;
}

const updatetime = function(){
    const currtime = new Date();
    const timediv = document.querySelector('.time-display .livetime');
    timediv.textContent = format(currtime, 'h-m a..aa');
}

const header_render = function(){
    const app = pagename();
    const date = datedisplay();
    const time = timedisplay();
    const header = document.querySelector('.header');
    header.append(app,date,time)
    setInterval(updatetime,60000) // update time every minute.
}

// Eventlistner functions

const logopress = function(){
    // To be updated in content area and navbar
}

const datepress = function(){
    // To be updated in content area and navbar
}

export {header_render , logopress, datepress}


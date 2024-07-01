import { header_render as header, datepress, logopress } from "./header.js";

header();

const eventhandler = (function(){
    const header_todo = document.querySelector('.logo');
    const header_date = document.querySelector('.date-display');
    header_todo.addEventListener('click',logopress);
    header_date.addEventListener('click',datepress);
})();

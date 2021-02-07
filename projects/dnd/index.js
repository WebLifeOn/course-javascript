/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {
});
var dragObj = null; //object to be moved
var xOffset = 0; //used to prevent dragged object jumping to mouse location
var yOffset = 0;
function dragObject(e)
/*Drag object*/
{
  e.preventDefault();
  e.stopPropagation();

  if(dragObj == null) return; // if there is no object being dragged then do nothing
  else if(e.type=="mousemove")
  {
    dragObj.style.left = e.clientX-xOffset +"px"; // adjust location of dragged object so doesn't jump to mouse position
    dragObj.style.top = e.clientY-yOffset +"px";
  }
  else if(e.type=="touchmove")
  {
    dragObj.style.left = e.targetTouches[0].clientX-xOffset +"px"; // adjust location of dragged object so doesn't jump to mouse position
    dragObj.style.top = e.targetTouches[0].clientY-yOffset +"px";
  }
}

function startDrag(e){
  e.preventDefault();
  e.stopPropagation();
  dragObj = e.target;
  dragObj.style.position = "absolute";
  var rect = dragObj.getBoundingClientRect();

  if(e.type=="mousedown")
  {
    xOffset = e.clientX - rect.left; //clientX and getBoundingClientRect() both use viewable area adjusted when scrolling aka 'viewport'
    yOffset = e.clientY - rect.top;
    window.addEventListener('mousemove', dragObject, true);
  }
  else if(e.type=="touchstart")
  {
    xOffset = e.targetTouches[0].clientX - rect.left; //clientX and getBoundingClientRect() both use viewable area adjusted when scrolling aka 'viewport'
    yOffset = e.targetTouches[0].clientY - rect.top;
    window.addEventListener('touchmove', dragObject, true);
  }
}

export function createDiv() {
  var element = document.createElement("div");
  element.setAttribute("draggable", "true");
  element.classList.add("draggable-div");
  element.setAttribute("id", "menuBar");
  element.setAttribute("style", "background:red; border: 1px solid blue; width: 200px; height: 200px");
  element.addEventListener("mousedown", startDrag, true);
  return element;
}
document.onmouseup = function(e)
    /*End dragging*/
{
  if(dragObj)
  {
    dragObj = null;
    window.removeEventListener('mousemove', dragObject, true);
    window.removeEventListener('touchmove', dragObject, true);
  }
}
const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});

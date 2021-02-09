/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('input', function () {
    showCooToHtml(filter());
});

addButton.addEventListener('click', () => {
    if( addNameInput.value.trim() != '' && addValueInput.value.trim() != ''){
        document.cookie = `${addNameInput.value.trim()}=${addValueInput.value.trim()}`;
        showCooToHtml(filter());
    }

});
function filter(){
    var cObj = getCookies();
    for(let item in cObj){
        if( !item.includes(filterNameInput.value) &&  !cObj[item].includes(filterNameInput.value) ){
                delete cObj[item]
        }
    }
    return cObj;
}

function showCooToHtml(cObj){
    clearTable();
    var fragment = document.createDocumentFragment();
    for (let item in cObj) {
        let tr = document.createElement('tr'),
            row1 = document.createElement('td'),
            row2 = document.createElement('td'),
            row3 = document.createElement('td'),
            btn = document.createElement('button');

        row1.textContent = item;
        row2.textContent = cObj[item];
        btn.textContent = 'delete';
        btn.setAttribute('data-key', item);
        btn.addEventListener("click", delCurCookies);
        row3.append(btn);

        tr.append(row1);
        tr.append(row2);
        tr.append(row3);
        fragment.append(tr);
    }
    listTable.append(fragment);
}
showCooToHtml(getCookies())

function delCurCookies(e){
    this.closest('tr').remove();
    document.cookie = `${this.dataset.key}=John; max-age=0`;
}
// listTable.addEventListener('click', (e) => {
//
// });

// получение всех куков в объект
function getCookies(){
    if(!document.cookie || document.cookie.length<2) return {};

    var res = {}, coo,
        cArr = document.cookie.split(/;\s?/);
    for (var i = 0; i < cArr.length; i++) {
        coo = cArr [i].split('=');
        res[coo[0]] = decodeURIComponent(coo[1]);
    }
    return res;
};

function clearTable(){
    listTable.innerHTML = '';
}


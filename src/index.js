import ListsClass from './modules/listsClass.js';
import './styles.css';

const localItems = JSON.parse(localStorage.getItem('lists')) || [];
const tasks = new ListsClass(localItems);
tasks.intialDisplay();

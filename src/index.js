// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import ListsClass from './modules/listsClass.js';
import './styles.css';

const array = [
  {
    description: 'Use best way to eat',
    completed: true,
    index: 1,
  },
  {
    description: 'Use best way to sleep',
    completed: false,
    index: 2,
  },
  {
    description: 'Use best way to stop',
    completed: false,
    index: 3,
  },
];

const tasks = new ListsClass(array);
tasks.display();

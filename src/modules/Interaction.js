import DragClass from './DragClass.js';

export default class extends DragClass {
  // reset the whole lists
  resetCompleted = () => {
    // delete all completed
    this.lists = this.lists.filter((list) => list.completed === false);
    this.sortLists();
    this.display();
  }

  // for css
  removeTasksDisplay = () => {
    const reset = document.getElementById('reset');

    if (this.lists.length === 0) {
      reset.style.display = 'none';
    } else {
      reset.style.display = 'block';
    }
  }

  // checked for css
  checked = (list) => {
    if (list.children[0].checked) {
      list.children[1].classList.add('strike');
    } else {
      list.children[1].classList.remove('strike');
    }
  };

  // update the checked
  updateChecker = (bool, id) => {
    this.lists.forEach((list) => {
      if (list.index.toString() === id) {
        list.completed = bool;
        this.set();
      }
    });
  }
}

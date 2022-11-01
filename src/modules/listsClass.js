export default class {
  constructor(lists) {
    this.lists = lists || [];
  }

  getList = ({ index, completed, description }) => `<li class="lists" id="${index}">
    <input name='checkboxes' type="checkbox" ${completed ? 'checked' : 'false'}>
    <span class="description" >${description}</span>
    <i class="fa-solid fa-ellipsis-vertical"></i>
  </li>`;

  display = () => {
    document.getElementById('to-do-list').innerHTML = '';
    this.lists.forEach((task) => {
      document.getElementById('to-do-list').innerHTML += this.getList(task);
    });
    this.listsEvents();
    const reset = document.getElementById('reset');
    reset.addEventListener('click', (e) => {
      e.preventDefault();
      this.reset();
    });
  }

  checked = (list) => {
    if (list.children[0].checked) {
      list.children[1].classList.add('strike');
    } else {
      list.children[1].classList.remove('strike');
    }
  };

  updateChecker = (bool, id) => {
    this.lists.forEach((list) => {
      if (list.index.toString() === id) {
        list.completed = bool;
      }
    });
  }

  listsEvents = () => {
    const listsUl = document.querySelectorAll('.lists');
    listsUl.forEach((list) => {
      this.checked(list);
      list.children[0].addEventListener('change', (e) => {
        e.preventDefault();
        this.checked(list);
        this.updateChecker(list.children[0].checked, list.id);
      });
      const createInput = (val) => {
        const input = document.createElement('input');
        input.classList.add('remove-box');
        input.setAttribute('value', val);
        return input;
      };
      list.children[1].addEventListener('click', (e) => {
        e.preventDefault();
        const input = createInput(e.target.innerHTML);
        list.replaceChild(input, list.children[1]);
        list.children[1].addEventListener('focusout', (event) => {
          this.updateList(e.target.innerHTML, event.target.value, list.id);
          this.display();
        });
      });
    });
  }

  addList = () => {
    const newList = document.getElementById('add-list');
    newList.addEventListener('focusout', (e) => {
      e.preventDefault();
      const objList = {
        description: newList.value,
        completed: false,
        index: this.lists.length + 1,
      };
      this.lists.push(objList);
      this.display();
      newList.value = '';
    });
  }

  reset = () => {
    this.lists.length = [];
    this.display();
  }

  updateList = (oldVal, newVal, id) => {
    this.lists.forEach((list) => {
      if (list.description === oldVal && list.index.toString() === id) {
        list.description = newVal;
      }
    });
  }
}
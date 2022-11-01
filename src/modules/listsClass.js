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
        list.com = bool;
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
    });
  }
}
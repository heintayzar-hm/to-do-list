export default class {
  constructor(lists) {
    this.lists = lists || [];
  }

  // get method
  get = () => {
    this.lists = JSON.parse(localStorage.getItem('lists'));
  }

  // set method
  set = () => {
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }

  // intial Display in browser
  intialDisplay = () => {
    this.display();
    this.addList();
    this.removeTasksDisplay();
  }

  // get a list in html
  getList = ({ index, completed, description }) => `<li class="lists" id="${index}">
    <input name='checkboxes' type="checkbox" ${completed ? 'checked' : 'false'}>
    <span class="description" >${description}</span>
    <div class='icon'>
    <i id='menu' class="fa-solid fa-ellipsis-vertical pointer"></i>
    <i id='del' class="fa-regular fa-trash-can pointer"></i>
    </div>
  </li>`;

  // display the lists
  display = () => {
    // for intial it is none
    document.getElementById('to-do-list').innerHTML = '';
    // loop the lists and show all
    this.lists.forEach((task) => {
      document.getElementById('to-do-list').innerHTML += this.getList(task);
    });
    // for the event like add, remove, update, delete lists
    this.listsEvents();
    // for css
    this.removeTasksDisplay();
  }

  // events for adding removing updating deleting lists
  listsEvents = () => {
    // get lists from dom
    const listsUl = document.querySelectorAll('.lists');
    // loop and update for checked
    listsUl.forEach((list) => {
      // for css checked
      this.checked(list);
      // event for change checked
      list.children[0].addEventListener('change', (e) => {
        e.preventDefault();
        // for css checked
        this.checked(list);
      });
      // update for desciption
      // create input when in update mode
      const createInput = (val) => {
        const input = document.createElement('input');
        input.classList.add('remove-box');
        input.setAttribute('value', val);
        return input;
      };

      // when click the description text run the code
      list.children[1].addEventListener('click', (e) => {
        e.preventDefault();
        // create input
        const input = createInput(e.target.innerHTML);
        // replace the whole elements with input
        list.replaceChild(input, list.children[1]);
        // when focus out update the code
        list.children[1].addEventListener('focusout', (event) => {
          this.updateList(e.target.innerHTML, event.target.value, list.id);
          this.display();
        });
      });

      // delete the lists
      list.children[2].addEventListener('click', (e) => {
        e.preventDefault();
        this.deleteLists(list.id);
        this.display();
      });
    });
  }

  // checked for css
  checked = (list) => {
    if (list.children[0].checked) {
      list.children[1].classList.add('strike');
    } else {
      list.children[1].classList.remove('strike');
    }
  };

  // for adding new lists fired at intial no need in event fired
  addList = () => {
    // get the input add section
    const newList = document.getElementById('add-list');
    // when out the focus
    newList.addEventListener('focusout', (e) => {
      // as long as it is not null
      if (!(newList.value === '' || newList.value === undefined || newList.value === null)) {
        e.preventDefault();
        //  new obj
        const objList = {
          description: newList.value,
          completed: false,
          index: this.lists.length + 1,
        };
        // add to lists
        this.lists.push(objList);
        // add to local
        this.set();
        this.display();
        newList.value = '';
      }
    });
  }

  // reset the whole lists
  reset = () => {
    // delete all
    this.lists = [];
    // in local
    this.set();
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

  // update the lists
  updateList = (oldVal, newVal, id) => {
    this.lists.forEach((list) => {
      // as long as they have valid description and good id
      if (list.description === oldVal && list.index.toString() === id) {
        if ((newVal === '' || newVal === undefined || newVal === null)) {
          // if you remove all texts
          this.deleteLists(id);
        } else {
          // set the new one
          list.description = newVal;
        }
        // local
        this.set();
      }
    });
  };

  // delete lists
  deleteLists = (index) => {
    this.lists.forEach((list, i) => {
      if (list.index.toString() === index) {
        // delete the given id
        this.lists.splice(i, 1);
        // sort the lists
        this.sortLists();
        // local
        this.set();
      }
    });
  }

  // sort the lists
  sortLists = () => {
    this.lists.forEach((list, i) => {
      list.index = i + 1;
    });
  }
}
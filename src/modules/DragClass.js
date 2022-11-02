export default class {
    DragMainEvent = () => {
      const draggables = document.querySelectorAll('.draggable');
      // for changing index
      let dragStartIndex; let
        dragEndIndex;
      draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', (e) => {
          this.dragStateCss(e.type, draggable);
          // get start id
          dragStartIndex = draggable.id;
        });
        draggable.addEventListener('dragend', (e) => {
          this.dragStateCss(e.type, draggable);
        });
        draggable.addEventListener('dragover', (e) => {
          e.preventDefault();
          this.dragStateCss(e.type, draggable);
        });
        draggable.addEventListener('dragenter', (e) => {
          this.dragStateCss(e.type, e.target.parentNode);
        });
        draggable.addEventListener('dragleave', (e) => {
          this.dragStateCss(e.type, e.target.parentNode);
        });
        draggable.addEventListener('drop', (e) => {
          this.dragStateCss(e.type, e.target.parentNode);
          dragEndIndex = draggable.id;
          // eslint-disable-next-line max-len
          this.lists.forEach((li) => {
            if (li.index.toString() === dragStartIndex) {
              // change to num and give it
              li.index = +dragEndIndex;
            } else if (li.index.toString() === dragEndIndex) {
              li.index = +dragStartIndex;
            }
          });
          // sort again
          this.sortLi();
        });
      });
    }

    // give class according to state
  dragStateCss = (state, draggable) => {
    switch (state) {
      case 'dragstart':
        draggable.classList.add('onDrag');
        break;
      case 'dragend':
        draggable.classList.remove('onDrag');
        break;
      case 'dragover':
        // code
        break;
      case 'dragenter':
        draggable.classList.add('onDragEnter');
        break;
      case 'dragleave':
        draggable.classList.remove('onDragEnter');
        break;
      case 'drop':
        draggable.classList.remove('onDragEnter');
        break;
      default:
        // nothing
    }
  }

  // sort by index
  sortLi = () => {
    this.lists = this.lists.sort((a, b) => a.index - b.index);
    this.set();
    this.display();
  }
}

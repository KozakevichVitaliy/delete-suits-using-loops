const rowsInMatrix = 7;
const elementsInRow = 6;

const deleteCardsSuits = (rowsInMatrix, elementsInRow) => {
  const table = document.getElementById('table');
  const matrix = [];

  // create matrix
  for (let j = 0; j < rowsInMatrix; j++) {
    const rowArr = [];

    for (let k = 0; k < elementsInRow; k++) {
      const cell = document.createElement('div');
      const randomNum = Math.floor(Math.random() * (5 - 1) + 1);

      cell.classList.add('cell');
      cell.setAttribute('row', j);
      cell.setAttribute('index', k);

      switch (randomNum) {
        case 1:
          cell.classList.add('heart');
          cell.innerHTML = '&#9825';
          break;
        case 2:
          cell.classList.add('diamond');
          cell.innerHTML = '&#9826';
          break;
        case 3:
          cell.classList.add('spade');
          cell.innerHTML = '&#9824';
          break;
        case 4:
          cell.classList.add('club');
          cell.innerHTML = '&#9827';
          break;
        default:
          break;
      }

      rowArr.push(cell);

      cell.addEventListener('click', function(e) {
        const eventRowIndex = parseInt(e.target.getAttribute('row'));
        const evennCellIndex = parseInt(e.target.getAttribute('index'));
        const eventClassCss = e.target.classList[1];
        const globalIdexesStoreForTop = [];
        const globalIdexesStoreForBottom = [];

        // delete suit in cell and push cellIndex to globalStore
        const deleteSuitInCell = (rowIndexInMatrix, cellIndex, arr, eventClassCss) => {
          if (matrix[rowIndexInMatrix][cellIndex].classList.contains(eventClassCss)) {
            matrix[rowIndexInMatrix][cellIndex].innerHTML = '';
            arr.push(cellIndex);
            if (
              rowIndexInMatrix &&
              matrix[rowIndexInMatrix - 1][cellIndex].classList.contains(eventClassCss)
            ) {
              matrix[rowIndexInMatrix - 1][cellIndex].innerHTML = '';
            }
            if (
              rowIndexInMatrix !== matrix.length - 1 &&
              matrix[rowIndexInMatrix + 1][cellIndex].classList.contains(eventClassCss)
            ) {
              matrix[rowIndexInMatrix + 1][cellIndex].innerHTML = '';
            }
            return true;
          } else {
            return false;
          }
        };

        // find cellIndex in row
        const findCellIndex = (
          deleteSuitInCell,
          globalStore,
          localStore,
          rowIndexInMatrix,
          eventClassCss
        ) => {
          for (let i = 0; i < localStore.length; i++) {
            for (let n = localStore[i]; n >= 0; n--) {
              if (!deleteSuitInCell(rowIndexInMatrix, n, globalStore, eventClassCss)) break;
            }
            for (let w = localStore[i]; w < matrix[rowIndexInMatrix].length; w++) {
              if (!deleteSuitInCell(rowIndexInMatrix, w, globalStore, eventClassCss)) break;
            }
          }
        };

        globalIdexesStoreForTop.push(evennCellIndex);
        globalIdexesStoreForBottom.push(evennCellIndex);
        matrix[eventRowIndex][evennCellIndex].innerHTML = '';

        // go to top in matrix from event cell and row
        for (let topRow = eventRowIndex; topRow >= 0; topRow--) {
          const localStoreTop = [...globalIdexesStoreForTop];
          globalIdexesStoreForTop.splice(0);
          if (localStoreTop.length) {
            findCellIndex(
              deleteSuitInCell,
              globalIdexesStoreForTop,
              localStoreTop,
              topRow,
              eventClassCss
            );
          } else {
            break;
          }
        }

        // go to bottom in matrix from event cell and row
        for (let bottomRow = eventRowIndex; bottomRow < matrix.length; bottomRow++) {
          const localStoreBottom = [...globalIdexesStoreForBottom];
          globalIdexesStoreForBottom.splice(0);
          if (localStoreBottom.length) {
            findCellIndex(
              deleteSuitInCell,
              globalIdexesStoreForBottom,
              localStoreBottom,
              bottomRow,
              eventClassCss
            );
          } else {
            break;
          }
        }
      });

      table.appendChild(cell);
    }

    matrix.push(rowArr);
  }
};

deleteCardsSuits(rowsInMatrix, elementsInRow);

import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import TableView from './Components/TableView';
import Card from './Containers/Card';
import { Provider } from 'react-redux';
import DroppingArea from './Containers/DroppingArea';
import CardWrapperView from './Components/CardWrapperView';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CardSelectorDroppable from './Components/CardSelectorDroppable';

const initialState = {
  cards: [],
  droppedCards: []
};

const nameArr = ['a', 'b', 'c', 'd', 'e'];

const createCards = () => {
  for (let i = 0; i < 5; i++) {
    let tempCard = {
      name: nameArr[i],
      timesDropped: 0
    };

    initialState.cards.push(tempCard);
  }
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/********************* */

createCards();

/*****************
 *
 *  REDUCER
 *****************/
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DRAG_ENDED': {
      const { result } = action;

      //index of where the dropped card started
      // result.source.index

      //index of where the dropped card ended up
      // result.destination.index

      //id of card being dragged
      // result.draggableId

      const startIndex = result.source.index;
      const endIndex = result.destination.index;

      const newCardsArr = [...state.cards];
      const removed = newCardsArr.splice(startIndex, 1);
      newCardsArr.splice(endIndex, 0, ...removed);

      return {
        ...state,
        cards: newCardsArr
      };
    }
    default:
      return state;
  }
};

let store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

class App extends Component {
  /******************
   *  drag and drop methods
   *******************/
  onDragStart = start => {
    console.log('onDragStart runnning');
  };

  onDragUpdate = update => {
    console.log('onDragUpdate running');
  };

  onDragEnd = result => {
    console.log('onDragEnd running');

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    store.dispatch({ type: 'DRAG_ENDED', result });
  };

  /********************* */
  render() {
    const cards = store.getState().cards;
    return (
      <Provider store={store}>
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >
          <div>
            <TableView>
              <DroppingArea />
            </TableView>
            <CardSelectorDroppable cards={cards} />
          </div>
        </DragDropContext>
      </Provider>
    );
  }
}

export default App;

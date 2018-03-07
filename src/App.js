import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import CardWrapperView from './Components/CardWrapperView';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CardSelectorDroppable from './Components/CardSelectorDroppable';
import BlockBuilder from './Components/BlockBuilder';
import TableView from './Components/TableView';

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
      // const { result } = action;
      // const startIndex = result.source.index;
      // const endIndex = result.destination.index;
      // const newCardsArr = [...state.cards];
      // const removed = newCardsArr.splice(startIndex, 1);
      // newCardsArr.splice(endIndex, 0, ...removed);
      // return {
      //   ...state,
      //   cards: newCardsArr
      // };
    }
    case 'DROPPED_ON_BUILDER': {
      const { result } = action;
      //create copy of the card
      const cardCopy = {
        ...state.cards.find(card => card.name === result.draggableId)
      };

      const newDroppedCardsArr = state.droppedCards.concat(cardCopy);

      return {
        ...state,
        droppedCards: newDroppedCardsArr
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

    //if destination was builderDroppable
    if (result.destination.droppableId === 'builderDroppable') {
      store.dispatch({ type: 'DROPPED_ON_BUILDER', result });
    }
  };

  /********************* */
  render() {
    const state = store.getState();
    const cards = state.cards;
    const droppedCards = state.droppedCards;

    return (
      <Provider store={store}>
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >
          <div>
            <TableView>
              <BlockBuilder droppedCards={droppedCards} />
            </TableView>
            <CardSelectorDroppable cards={cards} />
          </div>
        </DragDropContext>
      </Provider>
    );
  }
}

export default App;

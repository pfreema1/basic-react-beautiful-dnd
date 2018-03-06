import React, { Component } from "react";
import "./App.css";
import { createStore } from "redux";
import TableView from "./Components/TableView";
import Card from "./Containers/Card";
import { Provider } from "react-redux";
import DroppingArea from "./Containers/DroppingArea";
import CardWrapperView from "./Components/CardWrapperView";

const initialState = {
  cards: [],
  droppedCards: []
};

const nameArr = ["foo", "fee", "bar", "baz", "bat"];

const createCards = () => {
  for (let i = 0; i < 5; i++) {
    let tempCard = {
      name: nameArr[i],
      timesDropped: 0
    };

    initialState.cards.push(tempCard);
  }
};

createCards();

/*****************
 *
 *  REDUCER
 *****************/
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CARD_DROPPED": {
      let droppedCard = { ...action.item };

      let newDroppedCardArr = state.droppedCards.concat(droppedCard);

      return {
        ...state,
        droppedCards: newDroppedCardArr
      };
    }
    case "NEW_CARD_HOVER_BEGIN": {
      let newCard = { ...action.card };

      let newDroppedCardArr = state.droppedCards.concat(newCard);

      return {
        ...state,
        droppedCards: newDroppedCardArr
      };
    }
    case "CARD_DROPPED_OUTSIDE_DROP_TARGET": {
      let droppedCard = { ...action.card };

      let newDroppedCardArr = state.droppedCards.filter(card => {
        return droppedCard.UID !== card.UID;
      });

      return {
        ...state,
        droppedCards: newDroppedCardArr
      };
    }
    default:
      return state;
  }
};

let store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

class App extends Component {
  render() {
    const cards = store.getState().cards;
    return (
      <Provider store={store}>
        <div>
          <TableView>
            <DroppingArea />
          </TableView>
          <CardWrapperView>
            {cards.map((card, index) => {
              return <Card key={index} cardIndex={index} />;
            })}
          </CardWrapperView>
        </div>
      </Provider>
    );
  }
}

export default App;

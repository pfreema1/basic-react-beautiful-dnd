import React, { Component } from "react";
import "./App.css";
import { createStore } from "redux";
import TableView from "./Components/TableView";
import Card from "./Containers/Card";
import { Provider } from "react-redux";
import DroppingArea from "./Containers/DroppingArea";
import CardWrapperView from "./Components/CardWrapperView";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

/******************
 *  styling functions
 */

/********************* */
const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

/********************* */

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
  /******************
   *  drag and drop methods
   *******************/
  onDragStart = start => {
    console.log("onDragStart runnning");
  };

  onDragUpdate = update => {
    console.log("onDragUpdate running");
  };

  onDragEnd = result => {
    console.log("onDragEnd running");
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
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <CardWrapperView>
                    {cards.map((card, index) => (
                      <Draggable
                        key={card.name}
                        draggableId={card.name}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div>
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={index}
                              cardIndex={index}
                              draggableStyle={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            />
                            {provided.placeholder}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </CardWrapperView>
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </Provider>
    );
  }
}

export default App;

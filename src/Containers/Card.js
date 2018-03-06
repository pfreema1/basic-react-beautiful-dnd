import React from "react";
import { connect } from "react-redux";
import CardView from "../Components/CardView";

class Card extends React.Component {
  render() {
    let { cardIndex, cards } = this.props;

    return (
      <CardView
        name={cards[cardIndex].name}
        timesDropped={cards[cardIndex].timesDropped}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards
  };
};

export default connect(mapStateToProps)(Card);

import React from "react";
import { connect } from "react-redux";
import DroppingAreaView from "../Components/DroppingAreaView";

class DroppingArea extends React.Component {
  render() {
    const { droppedCards } = this.props;

    return <DroppingAreaView droppedCards={droppedCards} />;
  }
}

const mapStateToProps = state => {
  return {
    droppedCards: state.droppedCards
  };
};

export default connect(mapStateToProps)(DroppingArea);

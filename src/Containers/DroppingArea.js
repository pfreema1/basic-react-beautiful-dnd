import React from 'react';
import { connect } from 'react-redux';
import DroppingAreaDroppable from '../Components/DroppingAreaDroppable';

class DroppingArea extends React.Component {
  render() {
    const { droppedCards } = this.props;

    return <DroppingAreaDroppable droppedCards={droppedCards} />;
  }
}

const mapStateToProps = state => {
  return {
    droppedCards: state.droppedCards
  };
};

export default connect(mapStateToProps)(DroppingArea);

import * as React from 'react';

/**
 * Wrapper component that allows playing and pausing of content
 */

interface Props {
  initialIndex?: number;
  stepInterval?: number;
  states: Array<any>;
  children: (state: any) => React.ReactNode;
}

interface State {
  index: number;
  state: any;
}

class PlayBar extends React.Component<Props> {
  interval: any;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      index: 0,
      state: props.states[props.initialIndex || 0],
    };
  }

  onBack = () => {
    if (this.state.index === 0) {
      clearInterval(this.interval);
      return;
    }
    const index = this.state.index - 1;
    this.setNewState(index);
  };

  onForward = () => {
    if (this.state.index >= this.props.states.length - 1) {
      clearInterval(this.interval);
      return;
    }
    const index = this.state.index + 1;
    this.setNewState(index);
  };

  onAutoPlay = () => {
    this.interval = setInterval(() => {
      this.onForward();
    }, this.props.stepInterval || 1000);
  };

  setNewState = (index: number) => {
    this.setState({
      index,
      state: this.props.states[index],
    });
  };

  resetState = () => {
    const { states, initialIndex } = this.props;
    this.setState({
      index: 0,
      state: states[initialIndex || 0],
    });
  };

  render() {
    return (
      <div>
        <div>
          <button onClick={this.onBack}>Back</button>
          <button onClick={this.onForward}>Forward</button>
          <button onClick={this.onAutoPlay}>Autoplay</button>
          <button onClick={this.resetState}>Reset</button>
        </div>
        {this.props.children(this.state.state)}
      </div>
    );
  }
}

export default PlayBar;

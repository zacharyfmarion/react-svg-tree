import * as React from 'react';
import Tree from '../Tree';
import TextLabel from './TextLabel';
import PlayBar from './PlayBar';

interface Props {}
type State = {
  vertexMap: Map<any, Array<any>>;
};

const LETTERS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
];

class TreeAnimation extends React.Component<Props> {
  interval: any;

  state: State = {
    vertexMap: new Map([
      ['O', ['E', 'F', 'N']],
      ['E', ['A', 'D']],
      ['F', []],
      ['N', ['G', 'M']],
      ['A', []],
      ['D', ['B', 'C']],
      ['G', []],
      ['M', ['H', 'I', 'J', 'K', 'L']],
      ['B', []],
      ['C', []],
      ['H', []],
      ['I', []],
      ['J', []],
      ['K', []],
      ['L', []],
    ]),
  };

  get states(): Array<Array<string>> {
    return LETTERS.reduce(
      (acc, letter, index) => {
        return [...acc, LETTERS.slice(0, index + 1)];
      },
      [[]],
    );
  }

  render() {
    console.log(this.states);
    return (
      <PlayBar states={this.states}>
        {visited => (
          <Tree
            width={200}
            height={75}
            rootId="O"
            nodeSize={5}
            vertices={this.state.vertexMap}
            levelSeparation={20}
            maxDepth={Infinity}
            siblingSeparation={15}
            subtreeSeparation={15}
          >
            {({ x, y, id }) => (
              <g>
                <circle
                  cx={x}
                  cy={y}
                  r={5}
                  fill={visited.includes(id) ? 'rgb(15, 98, 189)' : 'gray'}
                />
                <TextLabel x={x} y={y} id={id} />
              </g>
            )}
          </Tree>
        )}
      </PlayBar>
    );
  }
}

export default TreeAnimation;

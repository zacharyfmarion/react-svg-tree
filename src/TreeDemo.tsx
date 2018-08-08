import * as React from 'react';
import { Tree, Node } from './components';

const ErrorSvg = ({ style }) => (
  <svg viewBox="0 0 512 512" style={style}>
    <circle style={{ fill: '#ECF0F1' }} cx="256" cy="256" r="245.551" />
    <polygon
      style={{ fill: '#DF5F4E' }}
      points="411.159,130.395 381.605,100.841 256,226.446 130.395,100.841 100.841,130.395 226.446,256 
	100.841,381.605 130.395,411.159 256,285.554 381.605,411.159 411.159,381.605 285.554,256 "
    />
    <g>
      <path
        style={{ fill: '#231F20' }}
        d="M437.019,74.981C388.668,26.628,324.38,0,256,0S123.332,26.628,74.981,74.981S0,187.62,0,256
		s26.628,132.668,74.981,181.019S187.62,512,256,512s132.668-26.628,181.019-74.981S512,324.38,512,256
		S485.372,123.332,437.019,74.981z M256,491.102C126.365,491.102,20.898,385.635,20.898,256S126.365,20.898,256,20.898
		S491.102,126.365,491.102,256S385.635,491.102,256,491.102z"
      />
      <path
        style={{ fill: '#231F20' }}
        d="M168.033,83.896C195.44,69.827,225.037,62.694,256,62.694s60.56,7.134,87.967,21.202
		c1.527,0.784,3.157,1.155,4.763,1.155c3.793,0,7.453-2.072,9.305-5.68c2.635-5.134,0.609-11.432-4.524-14.067
		C323.121,49.705,290.314,41.796,256,41.796s-67.121,7.909-97.51,23.508c-5.135,2.635-7.16,8.934-4.524,14.067
		C156.602,84.505,162.901,86.531,168.033,83.896z"
      />
      <path
        style={{ fill: '#231F20' }}
        d="M446.696,158.49c-2.635-5.134-8.933-7.161-14.067-4.524c-5.135,2.635-7.16,8.934-4.524,14.067
		c14.068,27.407,21.202,57.003,21.202,87.967s-7.134,60.56-21.202,87.967c-2.635,5.134-0.609,11.432,4.524,14.067
		c1.527,0.784,3.157,1.155,4.763,1.155c3.793,0,7.453-2.073,9.305-5.68c15.599-30.388,23.508-63.194,23.508-97.509
		S462.295,188.879,446.696,158.49z"
      />
      <path
        style={{ fill: '#231F20' }}
        d="M343.967,428.104c-27.407,14.068-57.003,21.202-87.967,21.202s-60.56-7.134-87.967-21.202
		c-5.136-2.634-11.432-0.61-14.067,4.524c-2.635,5.134-0.609,11.432,4.524,14.067c30.389,15.599,63.195,23.508,97.51,23.508
		s67.121-7.909,97.51-23.508c5.135-2.635,7.16-8.934,4.524-14.067C355.399,427.495,349.099,425.47,343.967,428.104z"
      />
      <path
        style={{ fill: '#231F20' }}
        d="M79.37,153.966c-5.134-2.634-11.431-0.609-14.067,4.524C49.705,188.879,41.796,221.686,41.796,256
		s7.909,67.121,23.508,97.51c1.852,3.607,5.511,5.68,9.305,5.68c1.606,0,3.236-0.371,4.763-1.155
		c5.135-2.635,7.16-8.934,4.524-14.067C69.827,316.56,62.694,286.963,62.694,256s7.134-60.56,21.202-87.967
		C86.53,162.9,84.505,156.601,79.37,153.966z"
      />
      <path
        style={{ fill: '#231F20' }}
        d="M418.547,123.006l-29.554-29.554c-4.08-4.08-10.697-4.08-14.778,0L256,211.669L137.783,93.453
		c-4.08-4.08-10.697-4.08-14.778,0l-29.554,29.554c-4.08,4.08-4.08,10.697,0,14.778L211.669,256L93.453,374.217
		c-4.08,4.08-4.08,10.697,0,14.778l29.554,29.554c4.08,4.08,10.697,4.08,14.778,0L256,300.331l118.217,118.217
		c2.041,2.041,4.715,3.06,7.388,3.06c2.674,0,5.349-1.02,7.388-3.06l29.554-29.554c4.08-4.08,4.08-10.697,0-14.778L300.331,256
		l118.217-118.217C422.628,133.703,422.628,127.087,418.547,123.006z M278.165,248.612c-4.08,4.08-4.08,10.697,0,14.778
		l118.217,118.216l-14.777,14.777L263.388,278.165c-2.041-2.04-4.715-3.061-7.388-3.061c-2.674,0-5.349,1.021-7.388,3.061
		L130.395,396.382l-14.777-14.777l118.217-118.217c4.08-4.08,4.08-10.697,0-14.778L115.618,130.395l14.777-14.777l118.217,118.217
		c4.08,4.079,10.697,4.079,14.778,0l118.216-118.217l14.777,14.777L278.165,248.612z"
      />
    </g>
  </svg>
);

// Component to create a tree, used in docz as a demo of the component
class TreeDemo extends React.Component {
  state = {
    vertexMap: new Map([
      [0, [1, 2, 3]],
      [1, [4, 5]],
      [2, []],
      [3, [6]],
      [4, []],
      [5, []],
      [6, []],
    ]),
    maxNodeId: 6,
    error: null,
  };

  handleError = (error: string) => {
    this.setState({ error });
  };

  resetState = () => {
    this.setState({
      vertexMap: new Map([[0, []]]),
      maxNodeId: 0,
      error: null,
    });
  };

  addNode = (node: any) => {
    let { vertexMap, maxNodeId } = this.state;
    const children = vertexMap.get(node) || [];
    maxNodeId += 1;
    children.push(maxNodeId);
    vertexMap.set(node, children);
    vertexMap.set(maxNodeId, []);
    this.setState({ vertexMap, maxNodeId });
  };

  renderNodes = () => {
    let nodes = [];
    this.state.vertexMap.forEach((children, key) => {
      nodes.push(
        <Node
          id={key}
          labelText="+"
          childNodes={children}
          onClick={() => this.addNode(key)}
          style={{ cursor: 'pointer' }}
        />,
      );
    });
    return nodes;
  };

  render() {
    return (
      <div>
        <button
          onClick={this.resetState}
          style={{
            cursor: 'pointer',
            background: 'none',
            border: '1px solid lightgray',
            padding: 10,
            borderRadius: 4,
          }}
        >
          Reset Tree
        </button>
        {!this.state.error ? (
          <Tree
            width={200}
            height={100}
            showLabels={true}
            levelSeparation={20}
            siblingSeparation={15}
            subtreeSeparation={15}
            maxDepth={Infinity}
            onError={this.handleError}
          >
            {this.renderNodes()}
          </Tree>
        ) : (
          this.state.error && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 200,
              }}
            >
              <ErrorSvg style={{ width: 100, height: 100, marginBottom: 25 }} />
              {this.state.error}
            </div>
          )
        )}
      </div>
    );
  }
}

export default TreeDemo;

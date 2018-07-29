import * as React from 'react';
import * as utils from './utils';
import Node, { NodeElement } from './Node';

describe('util functions', () => {
  let tree: Array<NodeElement>;
  beforeEach(() => {
    tree = [
      <Node id={0} depth={0} rowIndex={0} childNodes={[1]} />,
      <Node id={1} depth={1} rowIndex={0} />,
    ];
  });

  describe('parent', () => {
    it('Returns the correct parent of a given node', () => {
      const node = tree.find(node => node.props.id === 1);
      const parent = utils.parent(node);
      expect(parent.props.id).toBe(1);
    });
  });
});

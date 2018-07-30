import TreeGraph from './TreeGraph';

describe('TreeGraph', () => {
  let tree;
  beforeEach(() => {
    tree = new TreeGraph(
      new Map([[0, [1, 2, 3]], [2, [5]], [3, []], [4, []], [5, []]]),
    );
  });

  describe('#parent', () => {
    it('should get the correct parent node id', () => {
      expect(tree.parent(2)).toBe(0);
    });
    it('should return -1 for a node with no parent', () => {
      expect(tree.parent(0)).toBe(-1);
    });
  });

  describe('#firstChild', () => {
    it('should return the correct first child id', () => {
      expect(tree.firstChild(0)).toBe(1);
    });
    it('should return -1 for a node with no children', () => {
      expect(tree.parent(4)).toBe(-1);
    });
  });
});

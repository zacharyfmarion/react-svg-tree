import TreeGraph, { mapGet } from './TreeGraph';
import { checkExtendsRange, getLeftMost } from './positionTree';

describe('TreeGraph', () => {
  let tree;
  let rootPosition;
  beforeEach(() => {
    rootPosition = { x: 50, y: 0, prelim: 0, mod: 0 };
    //              O
    //              |
    //     ----------------------
    //     |        |           |
    //     E        F           N
    //    |                    |
    //  -------            --------
    //  |     |            |      |
    //  A     D            G      M
    //        |                   |
    //     -------     ---------------------
    //     |     |     |    |    |    |    |
    //     B     C     H    I    J    K    L
    tree = new TreeGraph(
      new Map([
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
      new Map([
        ['A', 2],
        ['B', 2],
        ['C', 2],
        ['D', 2],
        ['E', 2],
        ['F', 2],
        ['G', 2],
        ['H', 2],
        ['I', 2],
        ['J', 2],
        ['K', 2],
        ['L', 2],
        ['M', 2],
        ['N', 2],
        ['O', 2],
      ]),
      [0, rootPosition],
    );
  });

  describe('#getLeftMost', () => {
    it('Returns the node if the level is greater than or equal to the depth', () => {
      expect(getLeftMost(tree, 0, 5, 5)).toBe(0);
    });
    it('Returns null if the node is a leaf', () => {
      expect(getLeftMost(tree, 4, 0, 1)).toBeNull();
    });
    it('Returns the left most for a node at a depth of 1', () => {
      expect(getLeftMost(tree, 'O', 0, 1)).toBe('E');
      expect(getLeftMost(tree, 'G', 0, 1)).toBe('H');
    });
    it('Returns the left most for a node at a depth of 2', () => {
      expect(getLeftMost(tree, 'O', 0, 2)).toBe('A');
      expect(getLeftMost(tree, 'N', 0, 2)).toBe('H');
    });
  });

  describe('#checkExtendsRange', () => {
    const options = {
      width: 100,
      height: 100,
    };
    it('will return true if x and y are inside the range', () => {
      expect(checkExtendsRange(5, 5, options));
    });
    it('will return false if x is outside the range', () => {
      expect(checkExtendsRange(-10, 0, options));
      expect(checkExtendsRange(105, 0, options));
    });
    it('will return false if y is outside the range', () => {
      expect(checkExtendsRange(0, -10, options));
      expect(checkExtendsRange(0, 105, options));
    });
  });
});

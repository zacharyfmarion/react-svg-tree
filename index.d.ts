import * as React from 'react';
import { Props as NodeProps } from './src/components/Node';
import { Props as TreeProps } from './src/components/Tree';

export { NodeProps };

declare class Node extends React.Component<NodeProps, any> {}
declare class Tree extends React.Component<TreeProps, any> {}

declare module 'react-svg-tree' {

}

export default Tree;

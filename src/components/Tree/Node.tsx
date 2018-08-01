import * as React from 'react';
import styled from 'styled-components';
import withDefaultProps from '../../helpers/withDefaultProps';

export type NodeElement = React.ReactElement<Props>;

export interface Props {
  id: number;
  childNodes?: Array<number>;
  className?: string;
  r?: number;
  cx?: number;
  cy?: number;
}

const Text = styled.text`
  font-size: 2px;
  fill: #fff;
`;

const NodeComponent: React.SFC<Props> = ({
  cx,
  cy,
  id,
  r,
  className,
}: Props) => (
  <g>
    <circle cx={cx} cy={cy} r={r} className={className} />
    <Text x={cx} y={cy}>
      {id}
    </Text>
  </g>
);

export default withDefaultProps({
  r: 2,
})(NodeComponent);

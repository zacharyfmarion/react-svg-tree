import * as React from 'react';

export interface ComponentDefaulter<DP> {
  <P extends { [key in keyof DP]?: any }>(
    Component: React.ComponentType<P>,
  ): React.ComponentType<
    Pick<P, Exclude<keyof P, keyof DP>> & // Mandate all properties in P and not in DP
      Partial<Pick<P, keyof DP>> // Accept all properties from P that are in DP, but use type from P
  >;
}

export default function withDefaults<DP>(
  defaultProps: DP,
): ComponentDefaulter<DP> {
  return Component => props => <Component {...defaultProps} {...props} />;
}

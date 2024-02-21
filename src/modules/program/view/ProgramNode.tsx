import { SpatialNavigationNode, SpatialNavigationNodeRef } from '@/src/lib/react-tv-space-navigation';

import { ProgramInfo } from '../domain/programInfo';
import { Program } from './Program';
import { LongProgram } from './LongProgram';
import { forwardRef } from 'react';

type Props = {
  programInfo: ProgramInfo;
  onSelect?: () => void;
  indexRange?: [number, number];
};

export const ProgramNode = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ programInfo, onSelect, indexRange }: Props, ref) => {
    return (
      <SpatialNavigationNode isFocusable onSelect={onSelect} indexRange={indexRange} ref={ref}>
        {({ isFocused }) => <Program isFocused={isFocused} programInfo={programInfo} />}
      </SpatialNavigationNode>
    );
  },
);
ProgramNode.displayName = 'ProgramNode';

export const LongProgramNode = forwardRef<SpatialNavigationNodeRef, Props>(
  ({ programInfo, onSelect, indexRange }: Props, ref) => {
    return (
      <SpatialNavigationNode
        isFocusable
        onSelect={onSelect}
        alignInGrid
        indexRange={indexRange}
        ref={ref}
      >
        {({ isFocused }) => <LongProgram isFocused={isFocused} programInfo={programInfo} />}
      </SpatialNavigationNode>
    );
  },
);
LongProgramNode.displayName = 'LongProgramNode';

import React from 'react';
import {styled} from '@material-ui/core/styles';
import Theme from '../../theme';

interface Props {
  children: React.ReactNode;
}

const Wrapper = styled('div')({
  //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  background: Theme.palette.background.default,
  minHeight: '100vh',
});

export default function StyleWrapper(props: Props) {
  return <Wrapper>{props.children}</Wrapper>;
}

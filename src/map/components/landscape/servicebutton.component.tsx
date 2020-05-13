import React from 'react';
import {IconButton, Tooltip} from '@material-ui/core';
import {DemoData} from '../../../assets/data/dataType';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

interface Props {
  service: DemoData;
  setDetailService: (service: DemoData) => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  isFiltered: boolean;
}

const ServiceIconButton = styled(IconButton)({padding: 3});
const ServiceIcon = styled.img<{filtered: boolean}>(props => ({
  height: 25,
  width: 25,
  opacity: props.filtered ? 0.15 : 1,
}));

export default function ServiceButton(props: Props) {
  const setDetailService = () => props.setDetailService(props.service);

  return (
    <Tooltip title={props.service.service}>
      <ServiceIconButton
        aria-label={props.service.service}
        onClick={setDetailService}
        ref={props.buttonRef}
      >
        <LazyLoad height={25}>
          <ServiceIcon
            src={props.service.img}
            alt={props.service.service}
            filtered={props.isFiltered}
          />
        </LazyLoad>
      </ServiceIconButton>
    </Tooltip>
  );
}

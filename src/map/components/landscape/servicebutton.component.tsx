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
  zoomFactor: number;
}

const ServiceIconButton = styled(IconButton)({padding: 3});
const ServiceIcon = styled.img<{filtered: boolean; zoomFactor: number}>(
  props => ({
    height: 25 * props.zoomFactor,
    width: 25 * props.zoomFactor,
    opacity: props.filtered ? 0.15 : 1,
  })
);

function ServiceButton(props: Props) {
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
            zoomFactor={props.zoomFactor}
          />
        </LazyLoad>
      </ServiceIconButton>
    </Tooltip>
  );
}

export default React.memo(ServiceButton, (prevProps, nextProps) => {
  return (
    prevProps.isFiltered === nextProps.isFiltered &&
    prevProps.zoomFactor === nextProps.zoomFactor
  );
});

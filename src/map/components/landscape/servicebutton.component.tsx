import React, {useEffect, useState} from 'react';
import {IconButton, Tooltip} from '@material-ui/core';
import {DemoData} from '../../../assets/data/dataType';
import styled from 'styled-components';
import ServiceIcon from '../../../shared/components/serviceIcon/serviceIcon.component';

interface Props {
  service: DemoData;
  setDetailService: (service: DemoData) => void;
  isFiltered: boolean;
  zoomFactor: number;
  shouldScroll: boolean;
}

const ServiceIconButton = styled(IconButton)({padding: 3});

function ServiceButton(props: Props) {
  const buttonRef = React.createRef<HTMLButtonElement>();

  const setDetailService = () => props.setDetailService(props.service);
  const [didScroll, setDidScroll] = useState(false);
  useEffect(() => {
    if (!didScroll && props.shouldScroll)
      buttonRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    setDidScroll(props.shouldScroll);
  }, [didScroll, props.shouldScroll, buttonRef]);

  return (
    <Tooltip title={props.service.service}>
      <ServiceIconButton
        aria-label={props.service.service}
        onClick={setDetailService}
        ref={buttonRef}
      >
        <ServiceIcon
          src={props.service.img}
          alt={props.service.service}
          height={25 * props.zoomFactor}
          style={{
            height: 25 * props.zoomFactor,
            width: 25 * props.zoomFactor,
            opacity: props.isFiltered ? 0.15 : 1,
          }}
        />
      </ServiceIconButton>
    </Tooltip>
  );
}

export default React.memo(ServiceButton, (prevProps, nextProps) => {
  return (
    prevProps.isFiltered === nextProps.isFiltered &&
    prevProps.zoomFactor === nextProps.zoomFactor &&
    prevProps.shouldScroll === nextProps.shouldScroll
  );
});

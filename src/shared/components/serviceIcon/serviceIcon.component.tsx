import React, {useState, useEffect, ImgHTMLAttributes} from 'react';
import LazyLoad from 'react-lazyload';

const Logo = require('./../../../assets/logos/placeholder.svg') as string;

export default function ServiceIcon(
  props: React.ImgHTMLAttributes<HTMLElement>
) {
  const [defaultIcon, setDefaultIcon] = useState(false);
  const handleDefault = () => {
    setDefaultIcon(true);
  };

  useEffect(() => {
    setDefaultIcon(false);
  }, [props.src]);

  return (
    <LazyLoad
      height={props.height}
      offset={100}
      placeholder={<img src={Logo} height={props.height} alt={props.alt} />}
    >
      <img
        {...props}
        alt={props.alt}
        src={defaultIcon ? Logo : props.src}
        onError={handleDefault}
      />
    </LazyLoad>
  );
}

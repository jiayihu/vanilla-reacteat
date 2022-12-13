import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { RectShape } from 'react-placeholder/lib/placeholders';

export function Image(props) {
  const { src, placeholderWidth, placeholderHeight, ...imgProps } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef();

  const handleLoad = useCallback(() => setIsLoaded(true), [setIsLoaded]);

  useEffect(() => {
    const imageEl = imageRef.current;
    if (imageEl) {
      imageEl.addEventListener('load', handleLoad);
      imageEl.src = src;
    }

    return () => {
      if (imageEl) imageEl.removeEventListener('load', handleLoad);
    };
  }, [src, handleLoad]);

  const placeholder = (
    <div className="my-awesome-placeholder">
      <RectShape
        color="whitesmoke"
        style={{ width: placeholderWidth, height: placeholderHeight }}
      />
    </div>
  );

  return (
    <>
      {isLoaded ? null : placeholder}
      <img ref={imageRef} alt="" {...imgProps} style={{ display: isLoaded ? 'initial' : 'none' }} />
    </>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  placeholderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholderHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

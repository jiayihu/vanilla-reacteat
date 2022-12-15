import { useCallback, useEffect, useRef, useState } from 'react';
import { RectShape } from 'react-placeholder/lib/placeholders';

export function Image(props: any) {
  const { src, placeholderWidth, placeholderHeight, ...imgProps } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>();

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

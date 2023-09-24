import React from 'react'
import { useKeenSlider } from 'keen-slider/react'

export default Carousel

function Carousel({ images }) {
  const [sliderRef] = useKeenSlider()

  return (
    <div ref={sliderRef} className="keen-slider">
      {images.map((image, index) => (
        <div key={index} className="keen-slider__slide">
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>
  )
}

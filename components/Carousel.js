import React from 'react'
import { useKeenSlider } from 'keen-slider/react'

export default Carousel

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active')
      })
    }
    function addActive(idx) {
      slider.slides[idx].classList.add('active')
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on('created', () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on('animationStarted', (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

function Carousel({ images }) {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  })
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  )

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {images.map((image, index) => (
          <div key={index} className="keen-slider__slide">
            <div className={'aspect-4x3'}>
              <img className="fit-image" src={image} alt={`Slide ${index + 1}`} />
            </div>
          </div>
        ))}
      </div>
      <div ref={thumbnailRef} className="keen-slider thumbnail">
        {images.map((image, index) => (
          <div key={index} className="keen-slider__slide">
            <div className={'aspect-4x3'}>
              <img className={'fit-image'} src={image} alt={`Slide ${index + 1}`} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

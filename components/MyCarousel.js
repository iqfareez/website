import { Carousel } from '@mantine/carousel'
import React from 'react'

function MyCarousel({ images }) {
  return (
    <Carousel maw={'100%'} mx="auto" withIndicators>
      {images.map((image, index) => (
        <Carousel.Slide key={index}>
          <div
            // https://github.com/mantinedev/mantine/issues/4174#issuecomment-1540557053
            onClick={(e) => {
              e.stopPropagation()
            }}
            style={{ position: 'relative' }}
          >
            <img src={image.src} alt={image.alt} />
            {image.alt && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#fff',
                  padding: '8px',
                }}
              >
                {image.alt}
              </div>
            )}
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}

export default MyCarousel

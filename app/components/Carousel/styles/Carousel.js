import styled from 'styled-components';
import Slider from 'react-slick';

export const Carousel = styled(Slider)`
  &&& {
    width: 100%;
    height: 100%;
    .slick-list,
    .slick-track,
    .slick-slide,
    .slick-slide > div {
      height: 100%;
    }
    .slick-dots {
      bottom: 25px;
      li button:before {
        font-size: 12px;
        line-height: 22px;
        opacity: 1;
        color: white;
      }
      li.slick-active button:before {
        opacity: 1;
        color: ${props => props.theme.primaryColor};
      }
    }
  }
`;

export const Container = styled.div`
  position: relative;
  width: ${props => props.width};
  height: ${props => props.height};
  ${props =>
    props.aspectRatio !== 'free' &&
    `
    width: 100%;
    padding-top: ${props.paddingTop};
    height: auto;
    `}
  ${Carousel} {
    ${props =>
      props.aspectRatio !== 'free' &&
      `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    `}
  }
`;

export const ImageContainer = styled.div`
  height: 100%;
`;

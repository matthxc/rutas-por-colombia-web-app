import styled from 'styled-components';

export const CenteredImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  ${props =>
    props.aspectRatio !== 'free' &&
    `
    padding-top: ${props.paddingTop};
    height: auto;
    `}
`;

export const CenteredImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  ${props => {
    if (props.vertical) {
      return `
        width: auto;
        height: 100%;
      `;
    }
    return `
      width: 100%;
      height: auto;
    `;
  }}
  transform: translate(-50%, -50%);
`;

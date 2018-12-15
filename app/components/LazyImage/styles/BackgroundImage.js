import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  position: relative;
  background-image: url(${props => props.src});
`;

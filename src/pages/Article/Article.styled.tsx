import styled from 'styled-components';

export const BackgroundHeader = styled.div.attrs(
  (props: { imageUrl: string }) => props
)`
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 245px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1000;
`;

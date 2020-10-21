import styled from 'styled-components';

export const App = styled.div`
    text-align: center;
`;


export const FancyBackground = styled.div`
  background: ${props => props.colors.first || "#bdc3c7"};
  background: -webkit-linear-gradient(to right, ${props => props.colors.first}, ${props => props.colors.second});
  background: linear-gradient(to right, ${props => props.colors.first}, ${props => props.colors.second});
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const FancyInput = styled.input`
  padding: 1rem 1.4rem;
  background: transparent;
  font-size: 32px;
  transition: all 0.3s;
  border: none;
  border-bottom: 0.3rem solid transparent;
  outline-width: 0;
  color: pink;

  &:focus {
    outline-width: 0;
    border-bottom: 0.3rem solid ${props => props.colors.first};
  }
`;

export const FancyButton = styled(FancyInput)`
  margin: 10px 0;
  border: 0.3rem solid ${props => props.colors.first};
  border-radius: 9px;
  color: pink;
  width: 100%;

  &:hover{
    background-color: rgba(41.2%, 41.2%, 41.2%, 30%)
  }
`;

export default FancyBackground;
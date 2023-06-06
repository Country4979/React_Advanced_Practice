import styled from 'styled-components';
import './Buttons.css';

const primaryColor = 'rgb(210, 156, 5)';

const Button = styled.button`
  cursor: pointer;
  min width: 45px;
  margin: 0;
  padding: 0;
  background-color: inherit;
  border-width: ${(props) => (props.variant === 'primary' ? '0px' : '2px')};
  border-color: ${(props) =>
      props.variant === 'primary' ? primaryColor : 'rgb(241, 85, 28)'}
  color: ${(props) =>
      props.variant === 'primary' ? primaryColor : 'rgb(241, 85, 28)'};
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  font-family: 'Ananda', 'Ananda Black';
  font-weight: bold; 
  font-style: italic;
  font-weight: bold;
 
  justify-content: center;
  min-width: 72px;
  outline-style: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  padding: 0 30px;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  text-decoration:  ${(props) => (props.variant ? 'underline' : 'none')};
  transition: background-color 0.2s;
  margin-right: ${(props) => (props.variant ? 0 : '10px')}
`;

export default Button;

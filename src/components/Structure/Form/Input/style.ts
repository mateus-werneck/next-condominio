import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 300px;
  height: 30px;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  color: var(--gray-500);
  text-indent: 0.5rem;
  outline-style: none;
  box-shadow: none;

  &:focus {
    border: 1px solid var(--orange);
  }
`;
export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.8rem;
  color: gray;
`;

export const StyledValidationAlert = styled.span`
  text-indent: 0.4rem;
  font-size: 0.75rem;
  color: red;
  margin-bottom: 1rem;
`;

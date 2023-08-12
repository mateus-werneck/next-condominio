import styled from 'styled-components';

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  min-height: 150px;
  gap: 1rem;
  margin-top: 1rem;
`;

export const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

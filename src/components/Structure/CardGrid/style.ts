import styled from 'styled-components';
import { Card, Grid } from '@mui/material';

export const StyledGrid = styled(Grid)`
  margin-top: 1rem;
  padding: 1rem;
  align-self: center;
  max-width: fit-content;
`;

export const StyledCard = styled(Card)`
  border-radius: 8px;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
    opacity: 0.9;
  }
`;

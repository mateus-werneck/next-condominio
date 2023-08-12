import Link from 'next/link';
import styled from 'styled-components';

export const StyledNavBar = styled.nav`
  @media (max-width: 640px) {
    width: 95%;
    transition: all 0.5s linear;
  }
`;

export const StyledLink = styled(Link)`
  &:hover {
    color: var(--blue);
  }
`;

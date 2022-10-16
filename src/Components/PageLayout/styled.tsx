import styled from "styled-components";

export const TopWrapper = styled.div`
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10em;
`;

export const ConnectButton = styled.button`
  background-color: var(--light-blue);
  color: var(--white-text-color);
  padding: 1em 2em;
  border-radius: 4px;
  font-size: 1.5rem;
  transition: transform 0.5s ease-out;

  &:hover {
    transform: scale(1.1);
  }
`;

import { styled } from "styled-components";

interface ModuleProps {
  id: number;
  type: string;
}

function Module({ id, type }: ModuleProps) {
  return <Wrapper>{id}</Wrapper>;
}

export default Module;

const Wrapper = styled.div`
  background-color: gray;
  width: 100%;
  height: 100%;
`;

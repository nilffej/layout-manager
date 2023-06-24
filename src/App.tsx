import { createContext, useState } from "react";

import Layout from "./components/Layout/Layout";
import Navbar from "./components/Navbar/Navbar";
import { styled } from "styled-components";

export const ModalContext = createContext({
  modalActive: false,
  toggleModal: () => {},
});

function App() {
  const [modalActive, setModalActive] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        modalActive: modalActive,
        toggleModal: () => setModalActive(!modalActive),
      }}
    >
      <Wrapper>
        <Navbar />
        <Body>
          <Layout />
        </Body>
      </Wrapper>
    </ModalContext.Provider>
  );
}

export default App;

const Wrapper = styled.div`
  font-family: "Open Sans", sans-serif;
`;

const Body = styled.div`
  padding-top: 3em;
`;

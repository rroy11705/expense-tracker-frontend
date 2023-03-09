import React, {useState, useMemo} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Orb from './Components/Orb/Orb'
import Layout from './Components/Layout/Layout'
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';

function App() {

  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])

  return (
    <AppStyled className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="expense" element={<Expenses />} />
              <Route path="*" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background: #000000;
  position: relative;
  main {
    flex: 1;
    background: #202020;
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;

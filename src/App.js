import React from 'react';
import styled from 'styled-components';
import ToDoListContainer from './components/ToDoList';

const AppWrapper = styled.div`
    background-color: cornflowerblue;
    padding: 40px 0;
    min-width: 400px;
    text-align: center;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
`;

function App() {
  return (
      <AppWrapper>
        <div>
          <ToDoListContainer />
        </div>
      </AppWrapper>
  );
}

export default App;
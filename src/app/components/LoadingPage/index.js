import React from 'react';
import { Spinner } from 'react-bootstrap';

import styled from 'styled-components';

const LoadingWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

const LoadingContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingPage = () => {
  return (
    <LoadingWrapper>
      <LoadingContent>
        <Spinner animation="border" variant="light" />
      </LoadingContent>
    </LoadingWrapper>
  );
};

export default LoadingPage;

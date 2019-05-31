import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button } from 'react-bootstrap';

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

const Loading = ({ fullHeight, error, retry, timedOut, pastDelay }) => {
  const renderPageLoader = () => (
    <LoadingWrapper>
      <LoadingContent>
        {error && (
          <div>
            Error! <Button onClick={retry}>Retry</Button>
          </div>
        )}
        {timedOut && (
          <div>
            Taking a long time... <Button onClick={retry}>Retry</Button>
          </div>
        )}
        {pastDelay && <Spinner animation="border" variant="light" />}
      </LoadingContent>
    </LoadingWrapper>
  );

  const renderLoader = () => (
    <div className="p-3 text-center">
      <Spinner animation="border" variant="light" />
    </div>
  );

  return <>{fullHeight ? renderPageLoader() : renderLoader()}</>;
};

export default Loading;

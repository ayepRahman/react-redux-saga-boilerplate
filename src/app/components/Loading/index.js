import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button } from 'react-bootstrap';

import styled from 'styled-components';

const LoadingWrapper = styled.div`
  text-align: center;
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9998;
  height: 100vh;
  width: 100vw;
`;

const LoadingContent = styled.div`
  height: 100px;
  width: 100px;
  position: absolute;
  left: 50%;
  margin-left: -50px;
  top: 50%;
  margin-top: -50px;
`;

const Loading = ({ loadable, extend, error, retry, timedOut, pastDelay }) => {
  const renderExtendLoader = () => (
    <LoadingWrapper>
      <LoadingContent>
        {loadable && (
          <div>
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
            {pastDelay && <Spinner animation="border" variant="blue" />}
          </div>
        )}
        {extend && <Spinner animation="border" variant="blue" />}
      </LoadingContent>
    </LoadingWrapper>
  );

  const renderLoader = () => (
    <div className="p-3 text-center">
      <Spinner animation="border" variant="dark" />
    </div>
  );

  return <>{extend || loadable ? renderExtendLoader() : renderLoader()}</>;
};

Loading.propTypes = {
  extend: PropTypes.bool, // Handle extend loader
  loadable: PropTypes.bool, // Handle react-loadable props
};

export default Loading;

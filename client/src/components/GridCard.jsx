import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const GridCardContainer = styled.div`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: #eee url(${props => props.background}) no-repeat;
    width: 100%;
    height: 100%;
  }
`;

const GridCard = ({ children, background, ...props }) => {
  return (
    <GridCardContainer background={background} {...props}>
      {children}
    </GridCardContainer>
  );
};

GridCard.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.string,
};

export default GridCard;

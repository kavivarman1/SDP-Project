// Partners.js
import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const PartnersContainer = styled(animated.div)`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 10px;
`;

const PartnerList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PartnerItem = styled.li`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
`;

const Partners = () => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <PartnersContainer style={props}>
      <Title>Partners</Title>
      <PartnerList>
        <PartnerItem>
          <span>Green Haven Turf</span>
          <span>John Doe</span>
        </PartnerItem>
        <PartnerItem>
          <span>Emerald Fields</span>
          <span>Jane Smith</span>
        </PartnerItem>
      </PartnerList>
    </PartnersContainer>
  );
};

export default Partners;

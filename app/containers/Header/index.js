/**
 *
 * Header
 *
 */

import React from 'react';
import styled from 'styled-components';

import { Container, Segment, Image, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from 'images/logo.png';

const SiteHeader = styled.header`
  background-color: white;
  position: relative;
  height: 80px;
`;

const Logo = styled(Image)`
  width: auto;
  height: 100%;
`;

export default () => (
  <SiteHeader>
    <Segment textAlign="center" basic className="h100">
      <Container className="header-container d-flex justify-content-between align-items-center h100">
        <Link to="/" className="brand-logo h100">
          <Logo src={logo} alt="Main logo" />
        </Link>
        <Header
          className="no-margin"
          as="h4"
          icon="info circle"
          content="Información"
        />
      </Container>
    </Segment>
  </SiteHeader>
);

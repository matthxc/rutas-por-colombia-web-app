import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import FormatMoney from 'utils/formatMoney';

// Semantic
import { Segment, Header, Grid } from 'semantic-ui-react';

const ContainerBox = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  padding: 2em;
  text-align: center;
`;

const moneyFormatter = new FormatMoney();

const ResultsBox = ({
  locationFrom,
  locationTo,
  category,
  routeResults: { totalPrice, duration, distance, tollCollectors },
}) => {
  if (
    !isEmpty(locationFrom) &&
    !isEmpty(locationTo) &&
    isNumber(category) &&
    isNumber(totalPrice) &&
    isNumber(tollCollectors) &&
    !isEmpty(duration) &&
    !isEmpty(distance)
  ) {
    const { title: locationFromTitle } = locationFrom;
    const { title: locationToTitle } = locationTo;
    return (
      <ContainerBox>
        <Header as="h3">{`De ${locationFromTitle.split(',')[0]} a ${
          locationToTitle.split(',')[0]
        }`}</Header>
        <Grid stackable columns="equal">
          <Grid.Row>
            <Grid.Column>
              <Header as="h4" className="no-margin">
                {distance}
              </Header>
              <Header as="h6" className="no-margin regular">
                DISTANCIA
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4" className="no-margin">
                {duration}
              </Header>
              <Header as="h6" className="no-margin regular">
                TIEMPO
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as="h4" className="no-margin">
                {tollCollectors}
              </Header>
              <Header as="h6" className="no-margin regular">
                NÚMERO DE PEAJES
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4" className="no-margin">
                {moneyFormatter.formatMoney(totalPrice)}
              </Header>
              <Header as="h6" className="no-margin regular">
                VALOR TOTAL
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </ContainerBox>
    );
  }
  return (
    <ContainerBox>
      <Segment basic>
        <Header as="h4" className="regular">
          Rutas por colombia es una forma sencilla de planear los recursos en
          tiempo y dinero necesarios para viajar por carretera entre dos
          ubicaciones.
        </Header>
      </Segment>
    </ContainerBox>
  );
};

ResultsBox.defaultProps = {
  locationFrom: null,
  locationTo: null,
};

ResultsBox.propTypes = {
  locationFrom: PropTypes.object,
  locationTo: PropTypes.object,
  category: PropTypes.number.isRequired,
  routeResults: PropTypes.object.isRequired,
};

export default ResultsBox;

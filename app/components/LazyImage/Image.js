import React from 'react';

// Semantic
import { Image } from 'semantic-ui-react';

// Components
import withLoader from './withLoader';

const ImageComponent = props => <Image {...props} />;

export default withLoader(ImageComponent);

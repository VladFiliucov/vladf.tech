import React from 'react';
import Layout from './';
import { addLocaleData } from 'react-intl';

import 'intl';
import messages from '../data/messages/ru';
import ru from 'react-intl/locale-data/ru';

addLocaleData(ru);

export default (props) => (
  <Layout
    {...props}
    i18nMessages={messages}
  />
);

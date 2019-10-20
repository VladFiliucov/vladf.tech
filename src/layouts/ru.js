import React from 'react';
import { Layout } from '../pages';
import { addLocaleData } from 'react-intl';

import 'intl';
import messages from '../data/messages/ru';
import ru from 'react-intl/locale-data/ru';

addLocaleData(ru);

export default (props) => {
  return (<Layout
    {...props}
    i18nMessages={messages}
  />)
};

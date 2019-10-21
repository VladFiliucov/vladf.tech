import React from 'react';
import Layout from './';
import { addLocaleData } from 'react-intl';

import 'intl';
import messages from '../data/messages/en';
import en from 'react-intl/locale-data/en';

addLocaleData(en);

export default (props) => <Layout {...props} i18nMessages={messages} />;

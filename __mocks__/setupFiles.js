import '@babel/polyfill';

global.document = {}
Object.defineProperty(document, 'getElementById', {
    value: () => {},
});

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
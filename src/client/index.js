import { clearItems, performAction, setInitialList } from './JS/app';

import './styles/style.scss';

document.getElementById('generate').addEventListener('click', performAction);

document.getElementById('clear').addEventListener('click', clearItems);

setInitialList();
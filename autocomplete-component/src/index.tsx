import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Autocomplete from './components/Autocomplete/Autocomplete';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// const stringItems = ["ACC", "Accent", "Ace DASL", "ACL2", "ACT-lll", "Ation!"];
const mixedItems = ["ACC", null, 99.25, {color: 'blue', size: 'big'}, new Date(), [1,3,'Eve'], 0, true, false, undefined, '', '\\^.'];

root.render(
  <React.StrictMode>
    <div className='autocomplete-container'>
      <Autocomplete items={mixedItems}/>
    </div>
  </React.StrictMode>
);
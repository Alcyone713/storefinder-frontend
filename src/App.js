import Map from './Components/Map';
import React from 'react';
import SidePanel from './Components/SidePanel';
import './App.css'

const apikey = 'RkXF6LLDJAR4VdPTjO7latfWKcEFWg-kkNemQ7IO5xc'

function App() {
  return (
    <div className='App'>
      <SidePanel/>
      <Map apikey={apikey} />
    </div>
  );
};

export default App;


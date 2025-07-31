import React from 'react';
import { createRoot } from 'react-dom/client';

function HelloComponent() {
  return (
    <div style={{ padding: '20px', fontSize: '1.5rem' }}>
      Login fasz
    </div>
  );
}


const container = document.getElementById('app');
const root = createRoot(container);
root.render(<HelloComponent />);

import React from 'react';

const FaceScanIframePage = () => {
  const serverUrl = 'https://192.168.1.72:3000'; // URL of your minimal-test server

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <header style={{ padding: '1rem', backgroundColor: 'white', borderBottom: '1px solid #ddd' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Face Scan Session</h1>
      </header>
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <iframe
          src={serverUrl}
          title="Face Scan"
          style={{ height: '100%', width: '100%', border: '1px solid #ccc', borderRadius: '8px' }}
          allow="camera; microphone"
        />
      </main>
    </div>
  );
};

export default FaceScanIframePage;

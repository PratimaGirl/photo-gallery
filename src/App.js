// // src/App.js
// import React, { useState } from 'react';
// import InitialScreen from './components/InitialScreen.js';
// import BirthdayMessage from './components/BirthdayMessage.js';
// import PhotoGallery from './components/PhotoGallery.js';

// function App() {
//   const [screen, setScreen] = useState('initial');

//   const handleInitialPress = () => {
//     setScreen('birthdayMessage');
//   };

//   const handleSurpriseClick = () => {
//     setScreen('photoGallery');
//   };

//   return (
//     <div>
//       {screen === 'initial' && <InitialScreen onPress={handleInitialPress} />}
//       {screen === 'birthdayMessage' && <BirthdayMessage onSurpriseClick={handleSurpriseClick} />}
//       {screen === 'photoGallery' && <PhotoGallery />}
//     </div>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InitialScreen from './components/InitialScreen';
import BirthdayMessage from './components/BirthdayMessage';
import PhotoGallery from './components/PhotoGallery';

function App() {
  return (
    <Routes>
      <Route path="/" element={<InitialScreen />} />
      <Route path="/birthday-message" element={<BirthdayMessage />} />
      <Route path="/photo-gallery" element={<PhotoGallery />} />
    </Routes>
  );
}

export default App;

import { GlobalStyle } from './GlobalStyle';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from '../pages/Home/Home';
import Article from '../pages/Article/Article';
import Error from '../pages/Error/Error';

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:articleId" element={<Article />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

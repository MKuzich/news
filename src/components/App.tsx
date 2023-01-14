import { GlobalStyle } from './GlobalStyle';
import { Routes, Route } from 'react-router-dom';
import React, { lazy } from 'react';

const Home = lazy(() => import('../pages/Home/Home'));
const Article = lazy(() => import('../pages/Article/Article'));
const Error = lazy(() => import('../pages/Error/Error'));

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

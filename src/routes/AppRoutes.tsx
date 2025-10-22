import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import DetailPage from '../pages/DetailPage';
import Header from '../components/Header';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/anime/:id" element={<DetailPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
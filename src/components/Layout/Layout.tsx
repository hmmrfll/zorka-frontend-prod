import React from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <main className="main">{children}</main>
            <div className="layers-wrapper">
                {/* This is where special effects will be rendered */}
            </div>
            <Footer />
        </>
    );
};

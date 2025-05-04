import React, { ReactNode } from 'react';
import Footer from '../Footer';
import Head from '../Head/Head';

type LayoutProps = {
    children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <React.Fragment>
            <div>
                <Head />
                {children}
                <Footer />
            </div>
        </React.Fragment>
    );
};
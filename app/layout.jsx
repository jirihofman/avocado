import pjson from '../package.json';
import Main from '../components/layout/main';
import PropTypes from 'prop-types';
import '../styles/global.css';

export default function RootLayout({
    children,
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
}) {

    return (
        <html lang={'cs'}>
            <head>
                <link rel='icon' href='/favicon.ico' />
                <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6' crossOrigin='anonymous' />
                <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js' integrity='sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf' crossOrigin='anonymous' />
            </head>
            <body><Main>{children}</Main></body>
        </html>
    );
}

export const metadata = {
    description: pjson.description,
    title: pjson.displayName,
};

RootLayout.propTypes = {
    children: PropTypes.object,
};

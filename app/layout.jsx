import pjson from '../package.json';
import Main from '../components/layout';
import PropTypes from 'prop-types';
import '../styles/global.css';

export default async function RootLayout(props) {

    const params = await props.params;
    const { lang } = params;
    const { children } = props;

    return (
        <html lang={lang || 'en'}>
            <head>
                <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' rel='stylesheet' crossOrigin='anonymous' />
                <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js' crossOrigin='anonymous' />
            </head>
            <body>
                <Main>
                    {children}
                </Main>
            </body>
        </html>
    );
}

export const metadata = {
    description: pjson.description,
    title: pjson.displayName,
};

RootLayout.propTypes = {
    children: PropTypes.array,
    params: PropTypes.object,
};

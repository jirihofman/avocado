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

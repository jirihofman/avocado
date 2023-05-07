import Header from './header';

export const siteTitle = 'Avokádo lekce lehce';

export default function Layout({ children, subtitle, title }) {
    return (
        <div className='container'>
            <Header>
                <h3>
                    {title}
                    <small className='text-muted'> {subtitle}</small>
                </h3>
            </Header>
            <main>{children}</main>
        </div>
    );
}

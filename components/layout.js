import Header from './header';

export default function Layout({ children, subtitle, title }) {
    return (
        <div className='max-w-7xl mx-auto px-4'>
            <Header>
                <h3 className='text-2xl font-semibold mt-4'>
                    {title}
                    <small className='text-gray-500 text-base ml-2'> {subtitle}</small>
                </h3>
            </Header>
            <main>{children}</main>
        </div>
    );
}

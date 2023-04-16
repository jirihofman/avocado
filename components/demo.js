import Link from 'next/link';

export default function Demo() {
    return (
        <section id='demo' className='px-1'>
            <h3>Demo</h3>

            <div className='accordion mb-2 px-1' id='accordionDemo'>
                <div className='accordion-item'>
                    <h2 className='accordion-header' id='headingOne'>
                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
                            <span>Demo</span>
                            <span className='badge bg-secondary mx-1'>3</span>
                        </button>
                    </h2>
                    <div id='collapseOne' className='accordion-collapse collapse show' aria-labelledby='headingOne' data-bs-parent='#accordionDemo'>
                        <div className='accordion-body px-2 mx-0'>
                            <p>Náhodně generované příklady k procvičování</p>
                            <div className='input-group px-0 mx-0'>
                                <div className='input-group-text btn-sm' style={{ maxWidth: '100px', minWidth: '100px' }}>Matematika</div>
                                <Link
                                    href='/board/demo/add-1'
                                    role='button'
                                    title='Sčítání'
                                    className='btn btn-outline-primary btn-sm'>Sčítání</Link>
                                <Link
                                    href='/board/demo/multiply-1'
                                    role='button'
                                    title='Malá násobilka'
                                    className='btn btn-outline-primary btn-sm'>Malá násobilka</Link>
                            </div>
                            <div className='input-group'>
                                <div className='input-group-text btn-sm' style={{ maxWidth: '100px', minWidth: '100px' }}>Zeměpis</div>
                                <Link
                                    href='/board/demo/capitals-1'
                                    as='/board/demo/capitals-1'
                                    role='button'
                                    title='Hlavní města'
                                    className='btn btn-outline-primary btn-sm'>Hlavní města</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='accordion-item'>
                    <h2 className='accordion-header' id='headingTwo'>
                        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseTwo' aria-expanded='false' aria-controls='collapseTwo'>
                            <span>Matematika</span>
                            <span className='badge bg-secondary mx-1'>5</span>
                        </button>
                    </h2>
                    <div id='collapseTwo' className='accordion-collapse collapse' aria-labelledby='headingTwo' data-bs-parent='#accordionDemo'>
                        <div className='accordion-body px-2 mx-0'>
                            <div className='input-group'>
                                <div className='input-group-text btn-sm' style={{ maxWidth: '100px', minWidth: '100px' }}>Aritmetika</div>
                                <Link
                                    href='/board/demo/add-1'
                                    role='button'
                                    title='Sčítání'
                                    className='btn btn-outline-primary btn-sm'>Sčítání</Link>
                                <Link
                                    href='/board/demo/multiply-1'
                                    role='button'
                                    title='Malá násobilka'
                                    className='btn btn-outline-primary btn-sm'>Malá násobilka</Link>
                            </div>
                            <div className='input-group'>
                                <div className='input-group-text btn-sm' style={{ maxWidth: '100px', minWidth: '100px' }}>Geometrie</div>
                                <Link
                                    href='/board/math/circle-1'
                                    role='button'
                                    title='Sčítání'
                                    className='btn btn-outline-primary btn-sm disabled'>Kružnice</Link>
                                <Link
                                    href='/board/math/multiply-2'
                                    role='button'
                                    title='Malá násobilka'
                                    className='btn btn-outline-primary btn-sm disabled'>Velká násobilka</Link>
                            </div>
                            <div className='input-group'>
                                <div className='input-group-text btn-sm' style={{ maxWidth: '100px', minWidth: '100px' }}>Zlomky</div>
                                <Link
                                    href='/board/math/fractions-1'
                                    role='button'
                                    title='Zlomky úvod'
                                    className='btn btn-outline-primary btn-sm disabled'>Úvod</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='accordion-item'>
                    <h2 className='accordion-header' id='headingThree'>
                        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseThree' aria-expanded='false' aria-controls='collapseThree'>
                            <span>Zeměpis</span>
                            <span className='badge bg-secondary mx-1'>5</span>
                        </button>
                    </h2>
                    <div id='collapseThree' className='accordion-collapse collapse' aria-labelledby='headingThree' data-bs-parent='#accordionDemo'>
                        <div className='accordion-body px-2 mx-0'>
                            <div className='input-group'>
                                <div className='input-group-text btn-sm' style={{ maxWidth: '100px', minWidth: '100px' }}>Hlavní města</div>
                                <Link
                                    href='/board/demo/capitals-1'
                                    role='button'
                                    title='Hlavní města - svět'
                                    className='btn btn-outline-primary btn-sm'>Svět</Link>
                                <Link
                                    href='/board/geography/capitals-2'
                                    role='button'
                                    title='Hlavní města - Afrika'
                                    className='btn btn-outline-primary btn-sm disabled'>Afrika</Link>
                                <Link
                                    href='/board/geography/capitals-3'
                                    role='button'
                                    title='Hlavní města - Amerika'
                                    className='btn btn-outline-primary btn-sm disabled'>Amerika</Link>
                                <Link
                                    href='/board/geography/capitals-4'
                                    role='button'
                                    title='Hlavní města - Asie'
                                    className='btn btn-outline-primary btn-sm disabled'>Asie</Link>
                                <Link
                                    href='/board/geography/capitals-5'
                                    role='button'
                                    title='Hlavní města - Evropa'
                                    className='btn btn-outline-primary btn-sm disabled'>Evropa</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

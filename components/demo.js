'use client';

import Link from 'next/link';
import { demoIds } from '../lib/questions';
import { useState } from 'react';

export default function Demo() {
    const [openSection, setOpenSection] = useState('demo');

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <section id='demo' className='px-1'>
            <h3 className='text-2xl font-semibold mb-4'>Demo</h3>

            <div className='mb-2 px-1 border border-gray-200 rounded-lg'>
                {/* Demo Section */}
                <div className='border-b border-gray-200'>
                    <h2>
                        <button 
                            className='w-full flex justify-between items-center p-4 text-left hover:bg-gray-50'
                            onClick={() => toggleSection('demo')}
                        >
                            <span className='flex items-center gap-2'>
                                <span>Demo</span>
                                <span className='bg-gray-500 text-white px-2 py-1 rounded text-sm'>{Object.keys(demoIds).length}</span>
                            </span>
                            <span className='text-2xl'>{openSection === 'demo' ? '−' : '+'}</span>
                        </button>
                    </h2>
                    {openSection === 'demo' && (
                        <div className='p-4 bg-gray-50'>
                            <p className='mb-4'>Náhodně generované příklady k procvičování</p>
                            <div className='flex flex-wrap gap-2 mb-2'>
                                <div className='bg-gray-200 px-3 py-1 rounded text-sm font-semibold' style={{ minWidth: '100px' }}>Matematika</div>
                                <Link legacyBehavior href='/board/demo/add-1'><a role='button' title='Sčítání' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Sčítání</a></Link>
                                <Link legacyBehavior href='/board/demo/add-2'><a role='button' title='Sčítání do 20' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Sčítání do 20</a></Link>
                                <Link legacyBehavior href='/board/demo/subtract-1'><a role='button' title='Odčítání 1-10' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Odčítání 1-10</a></Link>
                                <Link legacyBehavior href='/board/demo/subtract-2'><a role='button' title='Odčítání 1-20' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Odčítání 1-20</a></Link>
                                <Link legacyBehavior href='/board/demo/multiply-1'><a role='button' title='Malá násobilka' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Malá násobilka</a></Link>
                                <Link legacyBehavior href='/board/demo/larger-1'><a role='button' title='Najdi větší číslo' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Najdi vyšší 1-10</a></Link>
                                <Link legacyBehavior href='/board/demo/larger-2'><a role='button' title='Najdi větší číslo' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Najdi vyšší 1-20</a></Link>
                                <Link legacyBehavior href='/board/demo/larger-3'><a role='button' title='Najdi větší číslo' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Najdi vyšší 1-100</a></Link>
                                <Link legacyBehavior href='/board/demo/next-number-1'><a role='button' title='Najdi další číslo' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Najdi další číslo (10-20)</a></Link>
                            </div>
                            <div className='flex flex-wrap gap-2 mb-2'>
                                <div className='bg-gray-200 px-3 py-1 rounded text-sm font-semibold' style={{ minWidth: '100px' }}>Hry</div>
                                <Link legacyBehavior href='/board/demo/dice-add-1'><a role='button' title='Kostky sčítání' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>🎲 Sčítání</a></Link>
                                <Link legacyBehavior href='/board/demo/dice-larger-1'><a role='button' title='Najdi větší číslo na kostce' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>🎲 Najdi vyšší</a></Link>
                                <Link legacyBehavior href='/board/demo/dice-karak-1'><a role='button' title='Karak' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>🎲🐉 Karak</a></Link>
                                <Link legacyBehavior href='/board/demo/chess-1'><a role='button' title='Co můžu sebrat?' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>♟ Šachy</a></Link>
                                <Link legacyBehavior href='/board/demo/vybuchy-1'><a role='button' title='Výbuchy' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>💥 Výbuchy</a></Link>
                            </div>
                            <div className='flex flex-wrap gap-2 mb-2'>
                                <div className='bg-gray-200 px-3 py-1 rounded text-sm font-semibold' style={{ minWidth: '100px' }}>Doplň</div>
                                <Link legacyBehavior href='/board/demo/patterns-1'><a role='button' title='Doplň chybějící políčko' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>🔴 🗡️ ❓ 🚗</a></Link>
                            </div>
                            <div className='flex flex-wrap gap-2 mb-2'>
                                <div className='bg-gray-200 px-3 py-1 rounded text-sm font-semibold' style={{ minWidth: '100px' }}>Zeměpis</div>
                                <Link legacyBehavior href='/board/demo/capitals-1' as='/board/demo/capitals-1'><a role='button' title='Hlavní města' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Hlavní města</a></Link>
                            </div>
                            <div className='flex flex-wrap gap-2 mb-2'>
                                <div className='bg-gray-200 px-3 py-1 rounded text-sm font-semibold' style={{ minWidth: '100px' }}>
                                    Slova
                                    <span className='ps-1 emoji'></span>
                                </div>
                                <Link legacyBehavior href='/board/demo/words-1' as='/board/demo/words-1'><a role='button' title='Slova' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Slova</a></Link>
                            </div>
                            <div className='flex flex-wrap gap-2 mb-2'>
                                <div className='bg-gray-200 px-3 py-1 rounded text-sm font-semibold' style={{ minWidth: '100px' }}>
                                    Písmena
                                </div>
                                <Link legacyBehavior href='/board/demo/voice-alphabet-cz-1' as='/board/demo/voice-alphabet-cz-1'><a role='button' title='Písmena' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>ABCD</a></Link>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                <div className='bg-gray-200 px-3 py-1 rounded text-sm font-semibold' style={{ minWidth: '100px' }}>
                                    TV 📺
                                    <span className='ps-1 tv'></span>
                                </div>
                                <Link legacyBehavior href='/board/demo/tv-1' as='/board/demo/tv-1'><a role='button' title='Slova' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>👻 🇬🇧</a></Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Matematika Section */}
                <div className='border-b border-gray-200'>
                    <h2>
                        <button 
                            className='w-full flex justify-between items-center p-4 text-left hover:bg-gray-50'
                            onClick={() => toggleSection('math')}
                        >
                            <span className='flex items-center gap-2'>
                                <span>Matematika</span>
                                <span className='bg-gray-500 text-white px-2 py-1 rounded text-sm'>8</span>
                            </span>
                            <span className='text-2xl'>{openSection === 'math' ? '−' : '+'}</span>
                        </button>
                    </h2>
                    {openSection === 'math' && (
                        <div className='p-4 bg-gray-50'>
                            <div className='flex flex-wrap gap-2 mb-2'>
                                <div className='bg-gray-200 px-3 py-1 rounded text-sm font-semibold' style={{ minWidth: '100px' }}>Aritmetika</div>
                                <Link legacyBehavior href='/board/demo/add-1'><a role='button' title='Sčítání' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Sčítání</a></Link>
                                <Link legacyBehavior href='/board/demo/add-2'><a role='button' title='Sčítání do 20' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Sčítání do 20</a></Link>
                                <Link legacyBehavior href='/board/demo/subtract-1'><a role='button' title='Odčítání 1-10' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Odčítání 1-10</a></Link>
                                <Link legacyBehavior href='/board/demo/subtract-2'><a role='button' title='Odčítání 1-20' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Odčítání 1-20</a></Link>
                                <Link legacyBehavior href='/board/demo/multiply-1'><a role='button' title='Malá násobilka' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Malá násobilka</a></Link>
                            </div>
                            <div className='flex flex-wrap gap-2 mb-2'>
                                <div className='bg-gray-200 px-3 py-1 rounded text-sm font-semibold' style={{ minWidth: '100px' }}>Geometrie</div>
                                <Link legacyBehavior href='/board/math/circle-1'><a role='button' title='Sčítání' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm opacity-50 cursor-not-allowed'>Kružnice</a></Link>
                                <Link legacyBehavior href='/board/math/multiply-2'><a role='button' title='Malá násobilka' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm opacity-50 cursor-not-allowed'>Velká násobilka</a></Link>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                <div className='bg-gray-200 px-3 py-1 rounded text-sm font-semibold' style={{ minWidth: '100px' }}>Zlomky</div>
                                <Link legacyBehavior href='/board/math/fractions-1'><a role='button' title='Zlomky úvod' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm opacity-50 cursor-not-allowed'>Úvod</a></Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Zeměpis Section */}
                <div>
                    <h2>
                        <button 
                            className='w-full flex justify-between items-center p-4 text-left hover:bg-gray-50'
                            onClick={() => toggleSection('geography')}
                        >
                            <span className='flex items-center gap-2'>
                                <span>Zeměpis</span>
                                <span className='bg-gray-500 text-white px-2 py-1 rounded text-sm'>5</span>
                            </span>
                            <span className='text-2xl'>{openSection === 'geography' ? '−' : '+'}</span>
                        </button>
                    </h2>
                    {openSection === 'geography' && (
                        <div className='p-4 bg-gray-50'>
                            <div className='flex flex-wrap gap-2'>
                                <div className='bg-gray-200 px-3 py-1 rounded text-sm font-semibold' style={{ minWidth: '100px' }}>Hlavní města</div>
                                <Link legacyBehavior href='/board/demo/capitals-1'><a role='button' title='Hlavní města - svět' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm hover:bg-blue-50'>Svět</a></Link>
                                <Link legacyBehavior href='/board/geography/capitals-2'><a role='button' title='Hlavní města - Afrika' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm opacity-50 cursor-not-allowed'>Afrika</a></Link>
                                <Link legacyBehavior href='/board/geography/capitals-3'><a role='button' title='Hlavní města - Amerika' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm opacity-50 cursor-not-allowed'>Amerika</a></Link>
                                <Link legacyBehavior href='/board/geography/capitals-4'><a role='button' title='Hlavní města - Asie' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm opacity-50 cursor-not-allowed'>Asie</a></Link>
                                <Link legacyBehavior href='/board/geography/capitals-5'><a role='button' title='Hlavní města - Evropa' className='px-3 py-1 border border-blue-500 text-blue-600 rounded text-sm opacity-50 cursor-not-allowed'>Evropa</a></Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

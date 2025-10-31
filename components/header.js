'use client';

import pjson from '../package.json';
import Link from 'next/link';
import { useState } from 'react';

export default function Header({ children }) {

    const { version, author, repository, name } = pjson;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <header>
            <nav className='bg-gray-100 border-b border-gray-200'>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='flex justify-between items-center h-16'>
                        <a className='text-lg font-semibold text-gray-900 hover:text-gray-700' href='/'>🥑 Home</a>
                        <button 
                            className='md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none'
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label='Toggle navigation'
                        >
                            <span className='text-2xl'>☰</span>
                        </button>
                        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 right-0 bg-gray-100 md:bg-transparent border-b md:border-0 border-gray-200 md:ml-auto`}>
                            <ul className='flex flex-col md:flex-row md:space-x-4 p-4 md:p-0'>
                                <li><Link legacyBehavior href='/settings'><a className='block py-2 px-4 text-gray-400 cursor-not-allowed' title='Nastavení'>Nastavení</a></Link></li>
                                <li><Link legacyBehavior href='https://github.com/jirihofman/avocado'><a className='block py-2 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded' title='GitHub' target='_blank'>GitHub</a></Link></li>
                                <li><a className='block py-2 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded cursor-pointer' title='O Aplikaci' onClick={() => setIsModalOpen(true)}>O Aplikaci</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' onClick={() => setIsModalOpen(false)}>
                    <div className='bg-white rounded-lg shadow-xl max-w-lg w-full mx-4' onClick={(e) => e.stopPropagation()}>
                        <div className='flex justify-between items-center p-4 border-b border-gray-200'>
                            <h5 className='text-xl font-semibold'>O aplikaci 🥑</h5>
                            <button 
                                type='button' 
                                className='text-gray-400 hover:text-gray-600 text-2xl leading-none'
                                onClick={() => setIsModalOpen(false)}
                                aria-label='Close'
                            >
                                ×
                            </button>
                        </div>
                        <div className='p-4'>
                            <table className='w-full'>
                                <tbody>
                                    <tr className='border-b border-gray-200'>
                                        <th className='text-left py-2 pr-4 font-semibold'>Verze</th>
                                        <td className='py-2'>{version}</td>
                                    </tr>
                                    <tr className='border-b border-gray-200'>
                                        <th className='text-left py-2 pr-4 font-semibold'>Autor</th>
                                        <td className='py-2'>{author.name}</td>
                                    </tr>
                                    <tr>
                                        <th className='text-left py-2 pr-4 font-semibold'>Dotazy / chyby</th>
                                        <td className='py-2'><a href={repository.url + '/issues'} target='_blank' rel='noreferrer' className='text-blue-600 hover:text-blue-800 underline'>{name}</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='flex justify-end gap-3 p-4 border-t border-gray-200'>
                            <iframe src='https://ghbtns.com/github-btn.html?user=jirihofman&repo=avocado&type=star&count=true&size=large&v=2' frameBorder='0' scrolling='0' width='170' height='30' title='GitHub' />
                            <iframe src='https://github.com/sponsors/jirihofman/button' title='Sponsor jirihofman' height='35' width='116' style={{ border: 0 }} />
                        </div>
                    </div>
                </div>
            )}
            {children}
        </header>
    );
}

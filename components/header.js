import Link from 'next/link'
import stylesHeader from './header.module.css'

export default function Header({ children }) {

  const cssLink = {
    paddingRight: '10px'
  }

  return (
    <header className={stylesHeader.header}>
      <ul id={stylesHeader.menu}>
        <li><Link href="/"><a title='Homepage'>🏠</a></Link></li>
        <li><Link href='/posts'><a title='Blog'>🗒</a></Link></li>
        <li><Link href='/settings'><a title='Nastavení'>⚙️</a></Link></li>
        <li><a href='https://github.com/jirihofman/avocado' target='_blank'>GitHub</a></li>
        <li><a href='#'>Copyright</a></li>
      </ul>
      {children}
    </header>
  )
}

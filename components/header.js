import { version, author, repository, name } from '../package.json';
import Link from 'next/link'

export default function Header({ children }) {

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">🥑Avokádo (lekce lehce)</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link href='/'><a className="nav-link" title='Homepage'>Home</a></Link></li>
              <li className="nav-item"><Link href='/posts'><a className="nav-link" title='Blog a novinky'>Blog</a></Link></li>
              <li className="nav-item"><Link href='/settings'><a className="nav-link disabled" title='Nastavení'>Nastavení</a></Link></li>
              <li className="nav-item"><Link href='https://github.com/jirihofman/avocado'><a className="nav-link" title='GitHub' target='_blank'>GitHub</a></Link></li>
              <li className="nav-item"><a className="nav-link" title='O Aplikaci' role='button' data-bs-toggle="modal" data-bs-target="#exampleModal">O Aplikaci</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">O aplikace 🥑</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <table>
                <tbody>
                  <tr>
                    <th>Verze</th>
                    <td>{version}</td>
                  </tr>
                  <tr>
                    <th>Autor</th>
                    <td>{author.name}</td>
                  </tr>
                  <tr>
                    <th>Dotazy / chyby</th>
                    <td><a href={repository.url + '/issues'} target="_blank">{name}</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <iframe src="https://ghbtns.com/github-btn.html?user=jirihofman&repo=random8&type=star&count=true&size=large&v=2" frameBorder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe>
              <iframe src="https://github.com/sponsors/jirihofman/button" title="Sponsor jirihofman" height="35" width="116" style={{ border: 0 }}></iframe>
            </div>
          </div>
        </div>
      </div>
      { children}
    </header>

  )
}

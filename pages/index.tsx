import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  },[])
  return (
    <div className="container-fliud">
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
            {(session) ? <a href="/channels/@me">Open Discord</a> : <a href="/login">Login</a> }
          </div>
        </div>
      </nav>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 font-weight-normal">IMAGINE A PLACE...</h1>
          <p className="lead font-weight-normal">...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
          <div className="row">
            <div className="col-md-7">
              <a className="btn btn-md btn-secondary">Download for windows</a>
            </div>
            <div className="col-md-5">
              <a className="btn btn-md btn-secondary" href="#information">Open Discord in your browser</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

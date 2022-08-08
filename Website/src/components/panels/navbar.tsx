import { useSession } from 'next-auth/react';
import Link from 'next/link';

function Feed() {
	const { data: session } = useSession();
	return (
		<nav className="navbar navbar-expand-lg bg-light">
			<div className="container-fluid">
				<Link href="/">
					<a className="navbar-brand" href="#">Navbar</a>
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link href="/terms">
								<a className="nav-link" href="#">Terms</a>
							</Link>
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
	);
}

export default Feed;

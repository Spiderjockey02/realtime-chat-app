import NavBar from '../components/panels/navbar';

export default function Home() {
	return (
		<div className="container-fluid">
			<NavBar />
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
	);
}

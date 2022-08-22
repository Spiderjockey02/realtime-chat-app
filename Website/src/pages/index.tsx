import NavBar from '../components/panels/navbar';
import inviteOnlyImg from '../../public/img/46b2132c01604c9493d558de444929f4.png';
import handingOutImg from '../../public/img/575a0322f3b36ca2fecb23ad2c6dd5ad.png';
import Image from 'next/image';

export default function Home() {
	return (
		<div className="container-fluid home_page" style={{ 'padding': '0px', 'overflowX':'hidden' }}>
			<NavBar />
			<div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center" style={{ 'backgroundImage': 'url(\'/img/e6d57714479874c665b36c7adee76b1d.png\')', 'height': '600px' }}>
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
			<div style={{ 'backgroundColor': 'white' }}>
				<div className="row">
					<div className="col-md-1"></div>
					<div className="col-md-5">
						<Image
							src={inviteOnlyImg}
							alt="Picture of the author"
							placeholder="blur"
							loading="lazy"
						/>
					</div>
					<div className="col-md-5">
						<h1>Create an invite-only place where you belong</h1>
						<p>Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</p>
					</div>
					<div className="col-md-1"></div>
				</div>
				<div className="row">
					<div className="col-md-1"></div>
					<div className="col-md-5">
						<h1>Where hanging out is easy</h1>
						<p>Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.</p>
					</div>
					<div className="col-md-5">
						<Image
							src={handingOutImg}
							alt="Picture of the author"
							placeholder="blur"
							loading="lazy"
						/>
					</div>
					<div className="col-md-1"></div>
				</div>
			</div>
		</div>
	);
}

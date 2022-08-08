import'next/head';
import 'bootstrap/dist/css/bootstrap.css';

export default function Register() {

	return (
		<html>
			<body>
				<div className="container">
					<div className="row">
						<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
							<div className="card border-0 rounded-3 my-5">
								<div className="card-body p-4 p-sm-5">
									<h5 className="card-title text-center mb-5 fw-light fs-5">Sign up</h5>
									<form action="/api/auth/register" method="POST">
										<div className="group">
											<input type="text" required name="name" />
											<span className="highlight"></span>
											<span className="bar"></span>
											<label>Name</label>
										</div>
										<div className="group">
											<input type="text" required name="email" />
											<span className="highlight"></span>
											<span className="bar"></span>
											<label>Email</label>
										</div>
										<div className="row">
											<div className="col-sm-6">
												<div className="group">
													<input type="password" id="show_hide_password" required name="password" />
													<span className="highlight"></span>
													<span className="bar"></span>
													<label>Password</label>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="group">
													<input type="password" id="show_hide_password" required name="password2" />
													<span className="highlight"></span>
													<span className="bar"></span>
													<label>Confirm</label>
												</div>
											</div>
										</div>
										<div className="form-check">
											<input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
											<label className="form-check-label">
                        Show password
											</label>
										</div>
										<div className="d-grid">
											<button className="btn btn-primary text-uppercase fw-bold" type="submit">Sign up</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}

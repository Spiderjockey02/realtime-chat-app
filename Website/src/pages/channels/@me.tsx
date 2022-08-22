import { useSession } from 'next-auth/react';
import '@popperjs/core';
import ServerSelector from '../../components/panels/server-selector';
import ChannelSelector from '../../components/panels/channel-selector';
import DMSelector from '../../components/panels/DM-selector';
import FriendTab from '../../components/panels/friend-tab';
import ActiveNow from '../../components/panels/active-now';
import MemberList from '../../components/panels/member-section';
import TextArea from '../../components/panels/text-channel';

import React from 'react';


function HomePage() {
	const { data: session, status } = useSession();
	const loading = status === 'loading';

	// When rendering client side don't display anything until loading is complete
	if (typeof window !== 'undefined' && loading) return null;
	if (!session) {
		return (
			<div>
				<p>Access Denied</p>
			</div>
		);
	} else {
		return (
			<div className="container-fluid" style={{ margin: 0, padding: 0 }}>
				<div className="row">
					<ServerSelector />
					<ChannelSelector />
					<div className="col" style={{ maxWidth: 'calc(100vw - 328px)' }}>
						<div style={{ height: 49, borderBottom: '1px solid black', padding: '0 20px' }}>
							<div className="row">
								<div className="col" style={{ maxWidth: 'calc(100vw - 50%)', display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
									<svg width={24} height={24} viewBox="0 0 24 24" className="icon-2xnN2Y" x={0} y={0} aria-hidden="true" role="img" >
										<path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z" ></path>
									</svg>
									<h6 className="text-truncate" style={{ minWidth: 150, maxWidth: 250 }}>
										Some header
									</h6>
									<div className="vertical" />
									<p className="text-truncate" style={{ maxWidth: 'calc()' }}>
										For general chit chatting. Please use 🤖commands for bot commands,
										random images (images not relevant to the conversation happening)
										and emoji testing (talking in emojis only).
									</p>
								</div>
								<div className="col" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }} >
									<svg x={0} y={0} className="icon-2xnN2Y" aria-hidden="true" role="img" width={24} height={24} viewBox="0 0 24 24" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Notification Settings" >
										<path fill="currentColor" d="M21.178 1.70703L22.592 3.12103L4.12103 21.593L2.70703 20.178L21.178 1.70703Z" />
										<path fill="currentColor" d="M18 10.5283L10.5287 18H21V17C19.344 17 18 15.657 18 14V10.5283Z" />
										<path fill="currentColor" d="M8.957 19.5718L9.52877 19H15.4449C14.7519 20.19 13.4759 21 11.9999 21C10.7748 21 9.68752 20.442 8.957 19.5718Z" />
										<path fill="currentColor" d="M12 3C13.417 3 14.71 3.5 15.734 4.321L5.99805 14.058C5.99805 14.0479 5.99856 14.038 5.99907 14.0283C5.99956 14.0188 6.00005 14.0094 6.00005 14V9C6.00005 5.686 8.68605 3 12 3Z" />
									</svg>
									<svg x={0} y={0} className="icon-2xnN2Y" aria-hidden="true" role="img" width={24} height={24} viewBox="0 0 24 24" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Pinned Messages" >
										<path fill="currentColor" d="M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15096 9.87801V9.88001L5.73596 8.46501L4.32196 9.88001L8.56496 14.122L2.90796 19.778L4.32196 21.192L9.97896 15.536L14.222 19.778L15.636 18.364L14.222 16.95L19.171 12H19.172L20.586 13.414L22 12Z" />
									</svg>
									<svg x={0} y={0} className="icon-2xnN2Y" aria-hidden="true" role="img" width={24} height={24} viewBox="0 0 24 24" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Hide Member List" >
										<path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z" />
										<path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z" />
										<path fill="currentColor" d="M20.0001 20.006H22.0001V19.006C22.0001 16.4433 20.2697 14.4415 17.5213 13.5352C19.0621 14.9127 20.0001 16.8059 20.0001 19.006V20.006Z" />
										<path fill="currentColor" d="M14.8834 11.9077C16.6657 11.5044 18.0001 9.9077 18.0001 8.00598C18.0001 5.96916 16.4693 4.28218 14.4971 4.0367C15.4322 5.09511 16.0001 6.48524 16.0001 8.00598C16.0001 9.44888 15.4889 10.7742 14.6378 11.8102C14.7203 11.8418 14.8022 11.8743 14.8834 11.9077Z" />
									</svg>
									<div className="input-group" style={{ maxWidth: 128 }}>
										<input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" style={{ height: 24 }} />
										<span className="input-group-text" style={{ height: 24, margin: 0, padding: 0 }} >
											<svg aria-hidden="true" role="img" width={24} height={24} viewBox="0 0 24 24" >
												<path fill="currentColor" d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"/>
											</svg>
										</span>
									</div>
									<svg x={0} y={0} className="icon-2xnN2Y" aria-hidden="true" role="img" width={24} height={24} viewBox="0 0 24 24" fill="none" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Inbox">
										<path d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z" fill="currentColor" />
									</svg>
									<a tabIndex={-1} style={{ color: 'white' }} href="/support" rel="noreferrer noopener" target="_blank" >
										<div className="iconWrapper-2awDjA clickable-ZD7xvu" role="button" aria-label="Help" tabIndex={0} >
											<svg x={0} y={0} className="icon-2xnN2Y" aria-hidden="true" role="img" width={24} height={24} viewBox="0 0 24 24" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Help" >
												<path fill="currentColor" d="M12 2C6.486 2 2 6.487 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.487 17.514 2 12 2ZM12 18.25C11.31 18.25 10.75 17.691 10.75 17C10.75 16.31 11.31 15.75 12 15.75C12.69 15.75 13.25 16.31 13.25 17C13.25 17.691 12.69 18.25 12 18.25ZM13 13.875V15H11V12H12C13.104 12 14 11.103 14 10C14 8.896 13.104 8 12 8C10.896 8 10 8.896 10 10H8C8 7.795 9.795 6 12 6C14.205 6 16 7.795 16 10C16 11.861 14.723 13.429 13 13.875Z" />
											</svg>
										</div>
									</a>
								</div>
							</div>
						</div>
						<div className="row">
							<div style={{ width: 'calc(100vw - 590px)', minHeight: 'calc(100vh - 50px)', backgroundColor: 'var(--color-lighter-dark)', marginLeft: 12 }} >
								<TextArea />
							</div>
							{/* Member role*/}
							<MemberList />
						</div>
					</div>
				</div>
			</div>

		);

	}
}


export default HomePage;

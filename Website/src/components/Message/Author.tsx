import type { User } from '../../types/datatypes';
import Overlay from 'react-bootstrap/Overlay';
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';

interface Props {
  user: User
}

export default function Author({ user }: Props) {
	const [show, setShow] = useState(false);
	const target = useRef(null);

	return (
		<span className="discord-author-info">
			<span className="discord-author-username" style={{ color: 'grey' }} ref={target} onClick={() => setShow(!show)}>{user.username}</span>
			<Overlay target={target.current} show={show} placement="right">
				{({ placement, arrowProps, show: _show, popper, ...props }) => (
					<div {...props}
						style={{
							position: 'absolute',
							backgroundColor: 'rgba(255, 100, 100, 0.85)',
							padding: '2px 10px',
							color: 'white',
							borderRadius: 3,
							...props.style,
						}}
					>
						<img src={user.avatar ?? 'https://cdn.discordapp.com/avatars/184376969016639488/755ecb6fe3bfd7a2918c6fc330a4b858.webp?size=32'} />
					</div>
				)}
			</Overlay>
			{user.bot ? <span className="discord-bot-tag">Bot</span> : ''}
		</span>
	);
}

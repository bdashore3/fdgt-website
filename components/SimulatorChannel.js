// Module imports
import React, {
	useEffect,
	useRef,
} from 'react'
import PropTypes from 'prop-types'





const SimulatorChannel = props => {
	const {
		channelName,
		events,
	} = props
	const newestMessageRef = useRef(null)

	useEffect(() => {
		const newestMessageEl = newestMessageRef.current

		if (newestMessageEl) {
			const {
				offsetHeight,
				scrollTop,
				scrollHeight,
			} = newestMessageEl.parentElement.parentElement

			if ((offsetHeight + scrollTop) !== scrollHeight) {
				newestMessageEl.scrollIntoView({ behavior: 'smooth' })
			}
		}
	}, [events])

	return (
		<ol>
			{events.map((event, index) => {
				const {
					details,
					message,
					timestamp,
					timestampMS,
					type,
					user,
				} = event
				let ref = null

				if (index === (events.length - 1)) {
					ref = newestMessageRef
				}

				switch (type) {
					case 'sub':
						return (
							<li
								className="subscription"
								key={index}
								ref={ref}>
								<time value={timestamp}>{timestamp}</time>
								<p>
									<strong className="username">{user.name}</strong><br />
									{(details.plan === 'Prime') && (
										<>
											<strong>Subscribed</strong> with <span className="plan-name">Twitch Prime</span>
										</>
									)}
									{(details.plan !== 'Prime') && (
										<>
											<strong>Subscribed</strong> at Tier {details.plan / 1000}
										</>
									)}
								</p>
							</li>
						)

					case 'message':
						return (
							<li
								className="message"
								key={index}
								ref={ref}>
								<time value={timestamp}>{timestamp}</time>
								<p>
									<span style={{ color: user.color }}>
										<strong>{`${user.name}: `}</strong>
									</span>
									<span>{message}</span>
								</p>
							</li>
						)

					case 'system':
						return (
							<li
								className="message"
								key={index}
								ref={ref}>
								<time value={timestampMS}>{timestamp}</time>
								<p>{message}</p>
							</li>
						)

					default:
						return null
				}
			})}
		</ol>
	)
}

SimulatorChannel.defaultProps = {
	events: [],
}

SimulatorChannel.propTypes = {
	events: PropTypes.array,
}





export { SimulatorChannel }
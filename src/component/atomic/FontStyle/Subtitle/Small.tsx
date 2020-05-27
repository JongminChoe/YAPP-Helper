import * as React from 'react'

import './small.scss'

interface SmallSubTitleProp {
	children?: React.ReactElement | string
}
const SmallSubTitle = ({ children }: SmallSubTitleProp) => {
	return (
		<p className="small-subtitle-style">
			{children}
		</p>
	)
}

export default SmallSubTitle
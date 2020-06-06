import * as React from 'react'
import { useEffect } from 'react'
import RecruitTemplate from '../../component/template/RecruitTemplate'
import RecruitInputContainer from '../../component/organisms/RecruitInputContainer'
import { useDispatch, useSelector } from 'react-redux'


const Recruit = () => {
	const dispatch = useDispatch();
	const { isLoaded } = useSelector<RootStore>(state => state.recruit) as RecruitState
	useEffect(() => {
		
	}, [])
	return (
		<div>
			<RecruitTemplate>
				<div>
					{
						isLoaded ? <RecruitInputContainer /> : "로딩 중 입니다."
					}
				</div>
			</RecruitTemplate>
		</div>
	)
}

export default Recruit
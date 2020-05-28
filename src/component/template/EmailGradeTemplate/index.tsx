import * as React from 'react'
import { useRouteMatch } from 'react-router-dom'
import FileInput from '../../atomic/File/Input'
import HeadGrade from '../../organisms/HeadGrade'
import SelectLayout from '../SelectLayout'

import './styles.scss'
import HeadTitleText from '../../atomic/FontStyle/HeadTitle'
import VerticalBar from '../../atomic/IconWrapper/VerticalBar'
interface EmailGradeTemplateProp {
	children: React.ReactElement | React.ReactElement[]
}
const EmailGradeTemplate = ({ children }: EmailGradeTemplateProp) => {
	/**
	 * todo: match.params.grade 단계에 따라서 다른 컴포넌트를 그린다
	 */

	return(
		<div>
			<SelectLayout>
				<header className="header-wrapper-container">
					<HeadTitleText>결과메일 발송</HeadTitleText>
					<VerticalBar></VerticalBar>
					<HeadGrade gradeList={['발표전형 선택', '엑셀파일업로드', '분류확인', '메일내용확인', '실시간 발송확인']} />
				</header>
				<section className="body-contents-wrapper">
					{children}
				</section>
			</SelectLayout>
		</div>
	)
}

export default EmailGradeTemplate
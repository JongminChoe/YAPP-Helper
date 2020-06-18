import { MailActionType } from "../action/mail"
import { SET_MAIL_TEXT } from "../action/actionTypes"

const initialState: MailInputState = {
	id: -1,
	text: "",
	title: "",
	type: "",
	headImageURL: "",
	subImageURL: "",
	headImage: null,
	subImage: null,
}
const mail = (state: MailInputState = initialState, action: MailActionType): MailInputState => {
	switch(action.type) {
		case SET_MAIL_TEXT :
			return {
				...state,
				text: action.payload
			}
		default :
			return { ...state }
	}
}

export default mail
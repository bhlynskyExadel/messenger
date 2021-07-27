import { initialState } from '../../../services/main-services';
import { actionType } from '../../../services/main-constants';

function messageReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.LOAD_MESSAGES: {
            const messages = action.data;
            return {
                ...state,
                messages,
            };
        }
        case actionType.CHANGE_CURRENT_GROUP: {
            let { groupId } = action;
            // get messages for current group when changing group
            const index = state.messages.findIndex((msg) => msg.groupId === groupId);

            return {
                ...state,
                currentGroup: { id: groupId, messages: state.messages[index].messages },
            };
        }
        case actionType.SEND_MESSAGE: {
            const { message } = action;

            const newMessages = JSON.parse(JSON.stringify(state.messages)); // deep copy
            const index = state.messages.findIndex((msg) => msg.groupId === state.currentGroup.id);
            newMessages[index].messages.push(message);

            return {
                ...state,
                messages: newMessages,
                currentGroup: {
                    ...state.currentGroup,
                    messages: [...state.currentGroup.messages, message],
                },
            };
        }

        default:
            return { ...state };
    }
}
export default messageReducer;

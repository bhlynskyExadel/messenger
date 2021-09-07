import { initialState } from '../../../services/main-services';
import { messageActions } from '../services/message-actions';

function messageReducer(state = initialState, action) {
    switch (action.type) {
        case messageActions.actionType.LOAD_MESSAGES: {
            const messages = action.data;

            return {
                ...state,
                messages,
            };
        }
        case messageActions.actionType.CHANGE_CURRENT_GROUP: {
            let { groupId } = action;
            // get messages for current group when changing group
            const index = state.messages.findIndex((msg) => msg.groupId === groupId);
            let groupMessages = [];

            if (index !== -1) {
                // findIndex returns -1 if index not found(no messages for this group)
                groupMessages = state.messages[index].messages;
            }

            return {
                ...state,
                currentGroup: { id: groupId, messages: groupMessages },
            };
        }
        case messageActions.actionType.SEND_MESSAGE: {
            const { message, newMessages } = action;

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

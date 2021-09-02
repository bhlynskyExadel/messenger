import { initialState } from '../../../services/main-services';
import { messageActions } from '../services/message-actions';

function messageReducer(state = initialState, action) {
    switch (action.type) {
        //load data
        case messageActions.actionType.LOADING_START:
            return {
                ...state,
                isMessagesLoading: true,
            };
        //load success
        case messageActions.actionType.LOADING_SUCCESS:
            return {
                ...state,
                messages: action.messages,
                isMessagesLoading: false,
            };
        //load error
        case messageActions.actionType.LOADING_ERROR: {
            return {
                ...state,
                error: action.error,
                isMessagesLoading: false,
            };
        }

        case messageActions.actionType.CHANGE_CURRENT_GROUP: {
            let { groupId } = action;
            // get messages for current group when changing group
            const index = state.messages.findIndex((msg) => msg.groupId === groupId);
            let groupMessages = [];

            if (index !== -1) {
                // findIndex returns -1 if index not found(no messages for this group)
                groupMessages = state.messages[index].groupMessages;
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

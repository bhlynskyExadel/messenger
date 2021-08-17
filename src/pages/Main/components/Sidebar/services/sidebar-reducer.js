import { initialState } from '../../../services/main-services';
import { actionType } from '../services/sidebar-constants';

function sidebarReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.LOAD_GROUPS: {
            // load groups for sidebar and also load message for default group
            const groups = action.data;

            return {
                ...state,
                groups,
                currentGroup: {
                    id: groups[0].id,
                    groupName: groups[0].groupName,
                },
            };
        }
        case actionType.CHANGE_CURRENT_GROUP: {
            // get messages for current group when changing group

            return {
                ...state,
                currentGroup: { id: action.groupId, groupName: action.groupName },
            };
        }
        case actionType.SEND_MESSAGE: {
            const { newGroups } = action;

            return { ...state, groups: newGroups };
        }
        case actionType.CREATE_NEW_GROUP: {
            const { group } = action;
            group.id = Math.random() * 100;

            return { ...state, groups: [...state.groups, group] };
        }

        default:
            return { ...state };
    }
}
export default sidebarReducer;

import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import SettingsReducer from './SettingsReducer';

import PostReducer from './PostReducer';
import PostListReducer from './PostListReducer';

import ThreadReducer from './ThreadReducer';
import CommentsReducer from './CommentsReducer';

import ResourceAddReducer from './ResourceAddReducer';
import ResourceFlagReducer from './ResourceFlagReducer';
import ResourceListReducer from './ResourceListReducer';
import ResourceThreadReducer from './ResourceThreadReducer';
import ResourceComments from './ResourceComments';

export default combineReducers({
    auth: AuthReducer,
    sett: SettingsReducer,
    postReducer: PostReducer,
    postList: PostListReducer,
    threadReducer: ThreadReducer,
    commentList: CommentsReducer,
    resourceAdd: ResourceAddReducer,
    resourceFlag: ResourceFlagReducer,
    resourceList: ResourceListReducer,
    resourceThread: ResourceThreadReducer,
    resourceCommentList: ResourceComments
});

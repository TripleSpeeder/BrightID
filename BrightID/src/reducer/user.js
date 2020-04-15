// @flow

import { dissoc } from 'ramda';
import {
  USER_SCORE,
  SET_IS_SPONSORED,
  SET_USER_PHOTO,
  SEARCH_PARAM,
  SET_USER_DATA,
  SET_USER_NAME,
  SET_NOTIFICATIONS,
  DISMISS_NOTIFICATION_MSG,
  SET_BACKUP_COMPLETED,
  SET_PASSWORD,
  SET_HASHED_ID,
  SET_USER_ID,
  REMOVE_SAFE_PUB_KEY,
  SET_VERIFICATIONS,
  HYDRATE_USER,
  RESET_STORE,
} from '@/actions';

const initialState = {
  score: __DEV__ ? 100 : 0,
  isSponsored: false,
  name: '',
  photo: { filename: '' },
  searchParam: '',
  notifications: [],
  notificationMsg: '',
  dismissedNotificationMsg: false,
  backupCompleted: false,
  id: '',
  publicKey: '',
  password: '',
  hashedId: '',
  secretKey: new Uint8Array([]),
  verifications: [],
};

export const reducer = (state: UserState = initialState, action: action) => {
  switch (action.type) {
    case USER_SCORE: {
      return {
        ...state,
        score: action.score,
      };
    }
    case SET_IS_SPONSORED: {
      return {
        ...state,
        isSponsored: action.isSponsored,
      };
    }
    case SET_USER_PHOTO: {
      return {
        ...state,
        photo: action.photo,
      };
    }
    case SEARCH_PARAM: {
      return {
        ...state,
        searchParam: action.searchParam,
      };
    }
    case SET_USER_DATA: {
      return {
        ...state,
        photo: action.photo,
        name: action.name,
        publicKey: action.publicKey,
        id: action.id,
        secretKey: action.secretKey,
      };
    }
    case SET_USER_NAME: {
      return {
        ...state,
        name: action.name,
      };
    }
    case SET_VERIFICATIONS: {
      return {
        ...state,
        verifications: action.verifications,
      };
    }
    case SET_NOTIFICATIONS: {
      let notificationMsg = '';
      let connectionCount = 0;
      let backupAccount = false;
      if (!state.dismissedNotificationMsg) {
        action.notifications.forEach((n) => {
          if (n.type === 'backup') {
            backupAccount = true;
          } else if (n.type === 'connection') {
            connectionCount += 1;
          }
        });
        if (connectionCount > 0) {
          notificationMsg = `${connectionCount} New Connections`;
        } else if (backupAccount) {
          notificationMsg = 'Backup your BrightID';
        }
      }

      return {
        ...state,
        notificationMsg,
        notifications: action.notifications,
      };
    }
    case DISMISS_NOTIFICATION_MSG: {
      return {
        ...state,
        notificationMsg: '',
        dismissedNotificationMsg: true,
      };
    }
    case SET_BACKUP_COMPLETED: {
      return {
        ...state,
        backupCompleted: action.backupCompleted,
      };
    }
    case SET_PASSWORD: {
      return {
        ...state,
        password: action.password,
      };
    }
    case SET_HASHED_ID: {
      return {
        ...state,
        hashedId: action.hash,
      };
    }
    case SET_USER_ID: {
      return {
        ...state,
        id: action.id,
      };
    }
    case REMOVE_SAFE_PUB_KEY: {
      return dissoc('safePubKey', state);
    }
    case HYDRATE_USER: {
      if (!action.data.name || !action.data.id || !action.data.secretKey)
        return state;

      return {
        ...state,
        score: action.data.score,
        name: action.data.name,
        photo: action.data.photo,
        backupCompleted: action.data.backupCompleted,
        id: action.data.id,
        publicKey: action.data.publicKey,
        password: action.data.password,
        hashedId: action.data.hashedId,
        secretKey: action.data.secretKey,
      };
    }
    case RESET_STORE: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

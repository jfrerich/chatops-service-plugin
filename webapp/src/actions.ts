import {Dispatch, AnyAction} from 'redux';
import Client from './client';

export function AddToTimelineAction(postId?: string, channelName?: string) {
    return async (dispatch: Dispatch<AnyAction>) => {
       await Client.runAddToTimelineAction(postId, channelName);
    };
}

export function CreateNewIncidentAction(postId?: string, channelName?: string) {
    return async (dispatch: Dispatch<AnyAction>) => {
       await Client.runCreateNewIncidentAction(postId, channelName);
    };
}
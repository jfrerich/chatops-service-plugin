// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {FC} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import MessagePostMenuIcon from 'src/components/assets/icons/post_menu_mre';
import IncidentMenuIcon from 'src/components/assets/icons/post_menu_incident';

import {GlobalState} from 'mattermost-redux/types/store';
import {Post} from 'mattermost-redux/types/posts';
import {Channel} from 'mattermost-redux/types/channels';

import {getPost} from 'mattermost-redux/selectors/entities/posts';
import {getChannel} from 'mattermost-redux/selectors/entities/channels';

import {AddToTimelineAction} from 'src/actions';
import {CreateNewIncidentAction} from 'src/actions';
import { log } from 'util';

interface Props {
    postId: string;
}

const SentPostIdToChatopsService: FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    const post = useSelector<GlobalState, Post>((state) => getPost(state, props.postId));
    const channel = useSelector<GlobalState, Channel>((state) => getChannel(state, post.channel_id));
    var channelName = channel.name;
    channelName = channelName.toLowerCase()
    var isMicopsChannel = channelName.startsWith("micops");

    const handleAddToTimelineClick = () => {
        dispatch(AddToTimelineAction(props.postId, channelName));
    };

    const handleCreateNewIncidentClick = () => {
        dispatch(CreateNewIncidentAction(props.postId, channelName));
    };

    if(isMicopsChannel){
        return (
            <React.Fragment>
                <li
                    className='MenuItem'
                    role='menuitem'
                >
                    <button
                        data-testid='mrePostMenuButton'
                        className='style--none'
                        role='presentation'
                        onClick={handleAddToTimelineClick}
                    >
                        <MessagePostMenuIcon/>
                        {'Add to timeline'}
                    </button>
                </li>
            </React.Fragment>
        );    }
    else {
        
        return (
            <React.Fragment>
               
            </React.Fragment>
        ); 
        // return (
        //     <React.Fragment>
        //         <li
        //             className='MenuItem'
        //             role='menuitem'
        //         >
        //             <button
        //                 data-testid='incidentPostMenuButton'
        //                 className='style--none'
        //                 role='presentation'
        //                 onClick={handleCreateNewIncidentClick}
        //             >
        //                 <IncidentMenuIcon/>
        //                 {'Create new Incident'}
        //             </button>
        //         </li>
        //     </React.Fragment>
        // ); 

    }

    
};

export default SentPostIdToChatopsService;
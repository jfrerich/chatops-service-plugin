import request from 'superagent';

export default class Client {
    constructor() {
        this.url = 'https://chatops-service';
    }

    runAddToTimelineAction = async (postId, channelName, extraData = {}) => {
        return this.doPost(`${this.url}`, postId,  channelName, 'addtoTimeline' , extraData);
    }

    runCreateNewIncidentAction = async (postId, channelName, extraData = {}) => {
        return this.doPost(this.url, postId, channelName, 'createIncident',  extraData);
    }

    doPost = async (url, postId, channelName, action,  headers = {}) => {
            try {
            fetch(url, {
                method: 'POST',
                // mode: 'cors',
                // cache: 'no-cache',
                // credentials: 'same-origin', 
                // headers: {
                //   'Content-Type': 'application/json'
                // },
                // redirect: 'follow', 
                // referrerPolicy: 'no-referrer', 
                body: JSON.stringify({ post_id: postId, channel_name: channelName,  type: action, token: ''})
              });

            // const response = await request.
            //     post(url).
            //     send({ post_id: postId, channel_name: channelName,  type: action, token: 's43o3q7rbtngdn4iqc86w5otry'}  )
            //     set(headers).
            //     type('application/json').
            //     accept('application/json');
        } catch (err) {
            throw err;
        }
    }
}

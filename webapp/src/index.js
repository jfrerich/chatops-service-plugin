import manifest from './manifest';
import SentPostIdToChatopsService from './components/post_menu';

export default class Plugin {
    // eslint-disable-next-line no-unused-vars
    initialize(registry, store) {
        // @see https://developers.mattermost.com/extend/plugins/webapp/reference/
        registry.registerPostDropdownMenuComponent(SentPostIdToChatopsService);

    }
}

window.registerPlugin(manifest.id, new Plugin());

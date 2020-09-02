package main

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/mattermost/mattermost-server/v5/plugin"
)

// Plugin implements the interface expected by the Mattermost server to communicate between the server and plugin processes.
type Plugin struct {
	plugin.MattermostPlugin

	// configurationLock synchronizes access to the configuration.
	configurationLock sync.RWMutex

	// configuration is the active plugin configuration. Consult getConfiguration and
	// setConfiguration for usage.
	configuration *configuration
}

// ServeHTTP demonstrates a plugin that handles HTTP requests by greeting the world.
func (p *Plugin) ServeHTTP(c *plugin.Context, w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, world!")
}

// OnActivate runs when the plugin activates and ensures the plugin is properly
// configured.
func (p *Plugin) OnActivate() error {
	// bot := &model.Bot{
	// 	Username:    "bookmarks",
	// 	DisplayName: "Bookmarks",
	// 	Description: "Created by the Bookmarks plugin.",
	// }
	// options := []plugin.EnsureBotOption{
	// 	plugin.ProfileImagePath("assets/profile.png"),
	// }

	// p.initialiseAPI()

	// botID, err := p.Helpers.EnsureBot(bot, options...)
	// if err != nil {
	// 	return errors.Wrap(err, "failed to ensure Bookmarks bot")
	// }
	// p.BotUserID = botID

	// return p.API.RegisterCommand(createBookmarksCommand())
	p.registerCommands()
	return nil
}

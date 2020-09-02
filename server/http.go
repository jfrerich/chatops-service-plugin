package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"

	"github.com/mattermost/mattermost-server/v5/model"
)

const serverURL = "serverURL"

func (p *Plugin) executeSendMRECommand(args *model.CommandArgs) *model.CommandResponse {

	command := args.Command
	argsD, _ := json.MarshalIndent(args, "", "    ")
	fmt.Printf("args = %+v\n", string(argsD))
	fmt.Printf("command = %+v\n", command)
	fmt.Println("sends http command!")

	// channel_id=jux16pkewjrkfj3ehep1psxyxc&
	// channel_name=town-square&
	// command=%2mre&
	// response_url=http%3A%2F%2Flocalhost%3A8065%2Fhooks%2Fcommands%2Fxbrkb8p393gjpq5cawei7npije&
	// team_domain=test&
	// team_id=carya1qs77bemjup96ff538snh&
	// text=asd&
	// token=okwexkjpe7ygb8eq1ww58t483w&
	// user_id=aoa1agao6t8fmx3ikt1j9w5ybw&
	// user_name=somename

	// taken from
	// https: //github.com/mattermost/mattermost-server/blob/master/app/plugin_commands.go#L116:15
	u := url.Values{}
	u.Set("team_id", args.TeamId)
	u.Set("channel_id", args.ChannelId)
	u.Set("user_id", args.UserId)
	u.Set("command", "/"+args.Command)
	u.Set("trigger_id", args.TriggerId)
	u.Set("response_url", serverURL)

	cmdResp, _ := p.DoHTTPPostRequest(u)
	// if err != nil {
	// 	return nil, err
	// }

	return cmdResp
}

// func (p *Plugin) DoHttpRequest(cmd *model.Command, u url.Values) (*model.Command, *model.CommandResponse, *model.AppError) {
func (p *Plugin) DoHTTPPostRequest(u url.Values) (*model.CommandResponse, error) {
	// Prepare the request
	var req *http.Request
	var err error

	req, err = http.NewRequest(http.MethodPost, serverURL, strings.NewReader(u.Encode()))
	if err != nil {
		return nil, errors.New("failed to biuld request")
	}

	req.Header.Set("Accept", "application/json")
	// req.Header.Set("Authorization", "Token "+cmd.Token)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	reqBody, err := json.Marshal(u)
	if err != nil {
		return nil, err
	}
	resp, err := http.Post(serverURL, "application/json", bytes.NewBuffer(reqBody))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	fmt.Println(string(body))

	var commandResp *model.CommandResponse
	json.Unmarshal(body, &commandResp)

	return commandResp, nil
}

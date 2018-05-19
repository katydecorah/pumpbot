# pumpbot

Slack reminders to pump while at work.

This script will pick a random photo of your little one from a Dropbox folder and post it in Slack throughout the day when it's time for you to pump.

## Set up

1. [Create a Dropbox App](https://www.dropbox.com/developers) with access to an App folder. This process will generate a folder in your Dropbox's "App" folder with the name of your app. Save images of your little one to the folder your Dropbox app created in your "Apps" folder.
2. Rename `.sample-env` to `.env` and in that file enter the following values for these parameters:
    - `SlackChannel` - The Slack channel or username of the person you want to send the message, for example: `#general`, `@katy`.
    - `SlackHookURL` - Your [Slack webhook URL](https://777revolutionary.slack.com/apps/A0F7XDUAZ-incoming-webhooks?page=1).
    - `DropboxAccessToken` - From your Dropbox app, click "Generate" under "Generated access token".

From the terminal, run:

```
npm install
npm link
```

## Running the script

Next, run the script:

```
pumpbot
```

## Scheduling

To schedule the Slack postings, you need to have the code run by a service such as Amazon Web Services (AWS). Check out this [setup guide](https://github.com/katydecorah/chillbot/blob/master/SETUP.md) for handy tips to get started.

require('dotenv').config();
require('isomorphic-fetch');
const request = require('request');
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: process.env.DropboxAccessToken });

module.exports.reminder = (event, context, callback) => {
  module.exports
    .listFiles()
    .then(files => module.exports.pickFile(files))
    .then(file => module.exports.checkIfShared(file))
    .then(link => module.exports.post(link))
    .then(response => callback(null, response))
    .catch(err => callback(err));
};

// check if the file is already shared
module.exports.checkIfShared = file => {
  return dbx
    .sharingListSharedLinks({ path: file })
    .then(response => {
      if (response.links.length) {
        return response.links[0].url;
      } else {
        return module.exports.getShareLink(file);
      }
    })
    .catch(error => error);
};

// get share link for file
module.exports.getShareLink = file => {
  return dbx
    .sharingCreateSharedLinkWithSettings({ path: file })
    .then(response => response.url)
    .catch(error => error);
};

// pick a random file from the dropbox folder
module.exports.pickFile = files =>
  files[Math.floor(Math.random() * files.length)].path_lower;

// get file from dropbox folder
module.exports.listFiles = () => {
  return dbx
    .filesListFolder({ path: '' })
    .then(response => response.entries)
    .catch(error => error);
};

// post to slack
module.exports.post = link => {
  const json = {
    channel: process.env.SlackChannel,
    username: 'pumpbot',
    icon_emoji: ':baby_bottle:',
    parse: 'full',
    text: 'Time to pump!',
    attachments: [
      {
        image_url: link.replace('www', 'dl')
      }
    ]
  };
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: process.env.SlackHookURL,
        json: json
      },
      (err, res) => {
        if (err) reject(err);
        if (res.statusCode !== 200)
          reject(`Got HTTP status ${res.statusCode} from Slack`);
        resolve('Posted to Slack.');
      }
    );
  });
};

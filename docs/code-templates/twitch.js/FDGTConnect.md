```js
const TwitchClient = require('twitch').default
const ChatClient = require('twitch-chat-client').default

const clientId = '123abc'
const clientSecret = 'foobar'
const twitchClient = TwitchClient.withClientCredentials(clientId, clientSecret)
const chatClient = ChatClient.forTwitchClient(twitchClient, {
	// Requires twitch.js version 4.1.0+
	hostName: 'irc.fdgt.dev',
})

chatClient.connect()
```
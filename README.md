# Expo - `with-rn-get-social`

An [Expo config plugin](https://docs.expo.io/guides/config-plugins) to setup [`getsocial-react-native-sdk`](https://docs.getsocial.im/guides/getting-started/react-native/), without touching native code


You can learn more about it here:

- [Config Plugins - Expo docs](https://docs.expo.io/guides/config-plugins)
- Expo Managed Workflow in 2021: [part 1](https://blog.expo.io/expo-managed-workflow-in-2021-5b887bbf7dbb), [part 2](https://blog.expo.io/expo-managed-workflow-in-2021-d1c9b68aa10)

## Getting started

Some points you need to be aware of before use this plugin
- **This plugin only works on Android**
- The plugin relays on regex to make some file modifications, so if it doesn't work with your configuration feel free to open an issue

## Installation

#### Prerequisites:

- App project using Expo SDK 41+.
- Installed `expo-cli@4.4.4` or later.
- Installed `getsocial-react-native-sdk` JavaScript libraries: `yarn add getsocial-react-native-sdk`

#### With `expo install`

```
expo install with-rn-get-social
```

#### Without `expo install`

```sh
# using yarn
yarn add with-rn-get-social

# using npm
npm install with-rn-get-social
```

Open your `app.json` or `app.config.js` and update your `plugins` section (`expo install` would do it for you):

```json
{
  "plugins": ["with-rn-get-social"]
}
```

## Configuration

The plugin needs to know the appId from `GetSocial`, you can read about how to configure GetSocial and get your appId on [Enable supported stores](https://docs.getsocial.im/guides/getting-started/react-native/#enable-supported-app-stores-on-the-dashboard)
```json
{
  "plugins": [
    [
      "with-rn-get-social", { appId: "YOUR_APP_ID_HERE" }
    ]
  ]
}
```


## Building and running

You can either:

- Use `expo prebuild` or `expo run:android`/`expo run:ios` to update your native projects,
- Use _[EAS Build](https://docs.expo.io/build/introduction/)_ to build your development client.

## Credits

- The Expo team ❤️

## License

MIT
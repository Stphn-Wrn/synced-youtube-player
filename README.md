# Synced YouTube Player

[Version française](README.fr.md)

A Foundry VTT module to watch YouTube videos together: the GM starts a video and every player sees it at the same moment, pauses and jumps included. Works with any system.

## What it does

- Synced playback for everyone at the table: play, pause, seek and stop follow the GM.
- YouTube search, or paste a link.
- A shared video library with folders and drag and drop, kept in the world.
- A floating widget you can move, resize and shrink to a small button; each user keeps their own volume and position.

## Installation

In Foundry: *Add-on Modules, Install Module*, then paste this manifest URL:

```
https://raw.githubusercontent.com/Stphn-Wrn/synced-youtube-player/main/module.json
```

## Usage

Enable the module in your world. The widget appears for the GM; its **folder** icon opens search and the library, and clicking a video plays it for everyone. Players see the widget while a video is playing.

Search works without setup through public [Invidious](https://invidious.io) instances, which are sometimes down. For reliable search, enter a **YouTube Data API v3** key in the module settings. Connected players can read this key: restrict it to the YouTube Data API in the Google console.

## Coming from the SotDL Companion

The player used to be part of the [SotDL Companion](https://github.com/Stphn-Wrn/sodl-custom). The first time a GM opens the world with this module, the video library, API key and Invidious instances are imported from the Companion; each user gets their volume and widget position back on their first visit.

## Troubleshooting

- **A video does not start for a player**: if the browser blocks autoplay, a **Join the broadcast** button appears. Some videos cannot be embedded outside YouTube: pick another one.
- **Search returns nothing**: enter a YouTube Data API key or change the Invidious instances in the settings. Pasting a link always works.
- The player loads its API from `youtube.com`, so it does not work offline or where YouTube is blocked.

## Customization

- **Colors**: CSS variables at the top of `src/youtube-player.css`, on `.yt-widget`.
- **Default position and size**: `_loadLayout()` in `src/widget.js`.
- **Sync**: `SYNC_TOLERANCE` (`src/broadcast.js`, 2 s) is the drift beyond which a player is resynced; `SYNC_INTERVAL_MS` (`src/widget.js`, 1 s) the check frequency.
- **Search**: `src/search.js` defines one provider per service (YouTube Data API when a key is set, Invidious otherwise). To add a service, write a provider exposing `search(text)` and plug it into `createSearchProvider`. `SEARCH_RESULTS_LIMIT` sets the number of results.
- **Link formats**: add a function to `PARSING_STRATEGIES` in `src/url-parser.js`.
- **Texts**: `lang/en.json` and `lang/fr.json`.

## Macros

```javascript
await SyncedYoutubeBroadcast.start(SyncedYoutubeManager.getLibrary().videos[0]);
await SyncedYoutubeSearch.query("tavern music");
```

## Development

```bash
npm test
```

## License

MIT.

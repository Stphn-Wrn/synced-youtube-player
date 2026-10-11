# Lecteur YouTube synchronisé

[English version](README.md)

Un module Foundry VTT pour regarder des vidéos YouTube ensemble : le MJ lance une vidéo et tous les joueurs la voient au même moment, pauses et sauts compris. Fonctionne avec tous les systèmes.

## Ce que fait le module

- Lecture synchronisée pour toute la table : lecture, pause, déplacement et arrêt suivent le MJ.
- Recherche YouTube, ou lien collé.
- Une bibliothèque de vidéos partagée, en dossiers avec glisser-déposer, enregistrée dans le monde.
- Un widget flottant que l'on déplace, redimensionne et réduit en pastille ; chacun garde son volume et sa position.

## Installation

Dans Foundry : *Modules complémentaires, Installer un module*, puis collez l'URL du manifeste :

```
https://raw.githubusercontent.com/Stphn-Wrn/synced-youtube-player/main/module.json
```

## Utilisation

Activez le module dans votre monde. Le widget apparaît pour le MJ ; son icône **dossier** ouvre la recherche et la bibliothèque, et cliquer sur une vidéo la lance chez tout le monde. Les joueurs voient le widget pendant la diffusion.

La recherche fonctionne sans configuration grâce à des instances publiques [Invidious](https://invidious.io), parfois indisponibles. Pour une recherche fiable, renseignez une clé **YouTube Data API v3** dans les paramètres du module. Cette clé est visible des joueurs connectés : restreignez-la à l'API YouTube Data dans la console Google.

## Si vous utilisiez le Compagnon SODL

Le lecteur faisait partie du [Compagnon SODL](https://github.com/Stphn-Wrn/sodl-custom). La première fois qu'un MJ ouvre le monde avec ce module, la bibliothèque de vidéos, la clé API et les instances Invidious sont reprises du Compagnon ; chacun retrouve son volume et la position de son widget à sa première connexion.

## Problèmes ?

- **La vidéo ne démarre pas chez un joueur** : si le navigateur bloque la lecture automatique, un bouton **Rejoindre la diffusion** apparaît. Certaines vidéos refusent d'être intégrées hors de YouTube : il faut en choisir une autre.
- **La recherche ne renvoie rien** : renseignez une clé YouTube Data API, ou changez les instances Invidious dans les paramètres. Coller un lien fonctionne toujours.
- Le lecteur charge son API depuis `youtube.com` : il ne fonctionne pas hors ligne ou si YouTube est bloqué.

## Personnalisation

- **Couleurs** : variables CSS en tête de `src/youtube-player.css`, sur `.yt-widget`.
- **Position et taille par défaut** : `_loadLayout()` dans `src/widget.js`.
- **Synchronisation** : `SYNC_TOLERANCE` (`src/broadcast.js`, 2 s) est l'écart au-delà duquel un joueur est resynchronisé ; `SYNC_INTERVAL_MS` (`src/widget.js`, 1 s) la fréquence de vérification.
- **Recherche** : `src/search.js` définit un fournisseur par service (API YouTube Data si une clé est renseignée, sinon Invidious). Pour ajouter un service, écrivez un fournisseur exposant `search(text)` et branchez-le dans `createSearchProvider`. `SEARCH_RESULTS_LIMIT` règle le nombre de résultats.
- **Formats de lien** : ajoutez une fonction à `PARSING_STRATEGIES` dans `src/url-parser.js`.
- **Textes** : `lang/fr.json` et `lang/en.json`.

## Macros

```javascript
await SyncedYoutubeBroadcast.start(SyncedYoutubeManager.getLibrary().videos[0]);
await SyncedYoutubeSearch.query("musique taverne");
```

## Développement

```bash
npm test
```

## Licence

MIT.

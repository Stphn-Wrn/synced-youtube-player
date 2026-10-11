import { MODULE_ID } from "./shared/constants.js";
import { loadTemplates, t } from "./shared/foundry-adapter.js";
import { SyncedYoutubeManager } from "./library-manager.js";
import { SyncedYoutubeBroadcast } from "./broadcast-manager.js";
import { SyncedYoutubeSearch } from "./search-service.js";
import { SyncedYoutubeWidget } from "./widget.js";
import { LIBRARY_TEMPLATE } from "./library-panel.js";
import { migrateFromCompanion, registerMigrationSettings } from "./shared/companion-migration.js";
import { CLIENT_RULES, WORLD_RULES } from "./migration-rules.js";

export const youtubePlayerFeature = {
  init() {
    window.SyncedYoutubeManager = SyncedYoutubeManager;
    window.SyncedYoutubeBroadcast = SyncedYoutubeBroadcast;
    window.SyncedYoutubeWidget = SyncedYoutubeWidget;
    window.SyncedYoutubeSearch = SyncedYoutubeSearch;

    game.settings.register(MODULE_ID, "youtubeApiKey", {
      name: "SYP.Settings.YoutubeApiKey.Name",
      hint: "SYP.Settings.YoutubeApiKey.Hint",
      scope: "world",
      config: true,
      type: String,
      default: ""
    });

    game.settings.register(MODULE_ID, "youtubeInvidiousInstances", {
      name: "SYP.Settings.YoutubeInvidiousInstances.Name",
      hint: "SYP.Settings.YoutubeInvidiousInstances.Hint",
      scope: "world",
      config: true,
      type: String,
      default: "https://inv.nadeko.net, https://yewtu.be, https://invidious.nerdvpn.de"
    });

    game.settings.register(MODULE_ID, "youtubeLibrary", {
      scope: "world",
      config: false,
      type: Object,
      default: { folders: [], videos: [] },
      onChange: () => SyncedYoutubeWidget.onLibraryChanged()
    });

    game.settings.register(MODULE_ID, "youtubeBroadcast", {
      scope: "world",
      config: false,
      type: Object,
      default: { video: null, playing: false, position: 0, updatedAt: 0 },
      onChange: () => SyncedYoutubeWidget.onBroadcastChanged()
    });

    game.settings.register(MODULE_ID, "youtubeVolume", {
      scope: "client",
      config: false,
      type: Number,
      default: 80
    });

    game.settings.register(MODULE_ID, "youtubeWidgetLayout", {
      scope: "client",
      config: false,
      type: Object,
      default: {}
    });

    registerMigrationSettings();
    loadTemplates([LIBRARY_TEMPLATE]);
  },

  async ready() {
    if (await migrateFromCompanion({ worldRules: WORLD_RULES, clientRules: CLIENT_RULES })) {
      ui.notifications.info(t("SYP.Migration.Done"));
    }
    SyncedYoutubeWidget.mount();
  }
};

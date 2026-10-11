import { test } from "node:test";
import assert from "node:assert/strict";
import { planMigration } from "../src/shared/companion-migration.js";
import { CLIENT_RULES, WORLD_RULES } from "../src/migration-rules.js";

test("brings the video library, API key and Invidious instances over from the Companion", () => {
  const library = { folders: [{ id: "f1", name: "Tavern" }], videos: [{ id: "v1", videoId: "abc", title: "Lute", folderId: "f1" }] };
  const oldValues = { youtubeLibrary: library, youtubeApiKey: "key-123", youtubeInvidiousInstances: "https://yewtu.be" };

  const values = planMigration(oldValues, WORLD_RULES);

  assert.deepEqual(values, oldValues);
});

test("does not copy an empty library or a running broadcast", () => {
  const oldValues = {
    youtubeLibrary: { folders: [], videos: [] },
    youtubeBroadcast: { video: { videoId: "abc" }, playing: true, position: 12, updatedAt: 1 }
  };

  assert.deepEqual(planMigration(oldValues, WORLD_RULES), {});
});

test("brings each user's volume and widget position over", () => {
  const oldValues = { youtubeVolume: 35, youtubeWidgetLayout: { left: 40, top: 80 } };

  assert.deepEqual(planMigration(oldValues, CLIENT_RULES), oldValues);
});

test("ignores settings the Companion never stored", () => {
  assert.deepEqual(planMigration({}, WORLD_RULES), {});
});

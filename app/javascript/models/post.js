import { attr } from "spraypaint/dist/spraypaint";

import { ApplicationRecord } from "models/application_record";

export const Post = ApplicationRecord.extend({
  static: {
    jsonapiType: "posts",
  },

  attrs: {
    title: attr(),
    body: attr(),
    views: attr(),
    createdAt: attr({ persist: false }),
    updatedAt: attr({ persist: false }),
  },
});

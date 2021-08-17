import { SpraypaintBase } from "spraypaint/dist/spraypaint";

export const ApplicationRecord = SpraypaintBase.extend({
  static: {
    baseUrl: "http://localhost:3000",
    apiNamespace: "/api/v1",
    clientApplication: "posts-ui",
  },
});

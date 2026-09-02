// src/worker.js
export default {
  async fetch(request, env, ctx) {
    return env.ASSETS.fetch(request);
  },
};

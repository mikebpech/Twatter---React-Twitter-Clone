const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  tweets: forwardTo("db"),
  tweet: forwardTo("db"),
  user: forwardTo("db"),
  users: forwardTo("db"),
  me(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
  }
};

module.exports = Query;

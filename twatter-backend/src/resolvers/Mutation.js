const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { hasPermission } = require("../utils");

const Mutations = {
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();

    const password = await bcrypt.hash(args.password, 10);

    const displayImg = `https://avatars.dicebear.com/v2/male/${args.email}.svg`;

    const handle = args.handle.toLowerCase();

    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          displayImg,
          handle,
          password,
          verified: false,
          permissions: { set: ["USER"] }
        }
      },
      info
    );

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error("No such user found for this email.");
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password!");
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Signed out successfully!" };
  },
  async updateUser(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    const updates = { ...args };
    delete updates.id;

    return ctx.db.mutation.updateUser(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async createTweet(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }

    let hashtags = args.message.match(/#[a-z0-9_]+/g);

    const tweet = await ctx.db.mutation.createTweet(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          hashtags: {
            set: hashtags
          },
          ...args
        }
      },
      info
    );
    return tweet;
  },
  async deleteTweet(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }

    const where = { id: args.id };
    const tweet = await ctx.db.query.tweet(
      { where },
      `{ id, message, user { id } }`
    );
    const ownsTweet = tweet.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(perm =>
      ["ADMIN"].includes(perm)
    );

    if (!ownsTweet && !hasPermissions) {
      throw new Error("You don't have permission to do that.");
    }

    return ctx.db.mutation.deleteTweet({ where }, info);
  },
  async followUser(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    const where = { id: args.id };

    const user = await ctx.db.query.user({ where }, `{ followers }`);
    const currentUser = await ctx.db.query.user(
      { where: { id: ctx.request.userId } },
      `{ following }`
    );

    if (!user || !currentUser) {
      throw new Error("Something went wrong...");
    }

    const followers = [...user.followers, ctx.request.userId];
    const following = [...currentUser.following, args.id];

    const userUpdate = await ctx.db.mutation.updateUser(
      { where, data: { followers: { set: followers } } },
      info
    );

    const currentUserUpdate = await ctx.db.mutation.updateUser(
      {
        where: { id: ctx.request.userId },
        data: { following: { set: following } }
      },
      info
    );

    return currentUser;
  },
  async unfollowUser(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    const where = { id: args.id };

    const user = await ctx.db.query.user({ where }, `{ followers }`);
    const currentUser = await ctx.db.query.user(
      { where: { id: ctx.request.userId } },
      `{ following }`
    );

    if (!user || !currentUser) {
      throw new Error("Something went wrong...");
    }

    const followers = user.followers.filter(val => val !== ctx.request.userId);
    const following = currentUser.following.filter(val => val !== args.id);
    console.log(followers, following);

    const userUpdate = await ctx.db.mutation.updateUser(
      { where, data: { followers: { set: followers } } },
      info
    );

    const currentUserUpdate = await ctx.db.mutation.updateUser(
      {
        where: { id: ctx.request.userId },
        data: { following: { set: following } }
      },
      info
    );

    return currentUser;
  }
};

module.exports = Mutations;

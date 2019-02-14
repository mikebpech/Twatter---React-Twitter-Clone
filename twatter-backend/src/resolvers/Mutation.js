const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();

    const password = await bcrypt.hash(args.password, 10);

    const displayImg = `https://avatars.dicebear.com/v2/jdenticon/${
      args.email
    }.svg`;

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
    const tweet = await ctx.db.mutation.createTweet(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );
    return tweet;
  }
};

module.exports = Mutations;

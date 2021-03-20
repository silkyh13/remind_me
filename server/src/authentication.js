const {
  AuthenticationService,
  JWTStrategy,
} = require("@feathersjs/authentication");

const {
  expressOauth,
  OAuthStrategy,
} = require("@feathersjs/authentication-oauth");
class GoogleOAuthStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);
    return {
      ...baseData,
      email: profile.email,
      avatar: profile.picture,
      first_name: profile.given_name,
      last_name: profile.family_name,
    };
  }
}
module.exports = (app) => {
  const authentication = new AuthenticationService(app);
  authentication.register("jwt", new JWTStrategy());
  authentication.register("google", new GoogleOAuthStrategy());
  app.use("/authentication", authentication);
  app.configure(expressOauth());
};

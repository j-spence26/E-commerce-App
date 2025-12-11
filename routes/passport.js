import passport from 'passport';

import { Strategy as GoogleStrategy } from 'passport-google-oidc'

export default function initPassport(pool) {

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
      },
      async function (issuer, profile, done) {
        try {
          const email = profile.emails?.[0]?.value;
          const firstName = profile.name?.givenName || profile.displayName;
          const lastName = profile.name?.familyName || "";


          const existingUser = await pool.query(
            `SELECT * FROM Customers WHERE email = $1`,
            [email]
          );

          if (existingUser.rows.length > 0) {
            return done(null, existingUser.rows[0]);
          }

          const result = await pool.query(
            `INSERT INTO Customers (first_name, last_name, email, google_id)
             VALUES ($1, $2, $3, $4)
             RETURNING customer_id, first_name, last_name, email`,
            [firstName, lastName, email, profile.id]
          );

          return done(null, result.rows[0]);

        } catch (err) {
          return done(err);
        }
      }
    )
  );


  passport.serializeUser((user, done) => {
    done(null, user.customer_id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const result = await pool.query(
        `SELECT * FROM Customers WHERE customer_id = $1`,
        [id]
      );
      done(null, result.rows[0]);
    } catch (err) {
      done(err);
    }
  });
};

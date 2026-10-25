import readline from "node:readline";
import { Writable } from "node:stream";
import { auth } from "../auth/auth.js";
import { db } from "./index.js";
import { user } from "./schema.js";

// Prompts in the terminal without echoing what you type
function askPassword(question) {
  return new Promise((resolve) => {
    let muted = false;
    const output = new Writable({
      write(chunk, encoding, callback) {
        if (!muted) process.stdout.write(chunk, encoding);
        callback();
      },
    });
    const rl = readline.createInterface({
      input: process.stdin,
      output,
      terminal: true,
    });

    process.stdout.write(question);
    muted = true;
    rl.question("", (answer) => {
      muted = false;
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
  });
}

// Keeps asking until the password is long enough (better-auth requires 8+)
export async function promptPassword(email, minLength = 8) {
  let password = "";
  while (password.length < minLength) {
    password = await askPassword(
      `Password for ${email} (min ${minLength} characters): `
    );
  }
  return password;
}

// First user is created through better-auth (has a password, can log in).
// The rest are plain rows with no password (can't log in).
// Returns all users in the same order as usersData.
export async function insertUsers(usersData, firstUserPassword) {
  const [firstUser, ...otherUsers] = usersData;

  const res = await auth.api.signUpEmail({
    body: {
      name: firstUser.name,
      email: firstUser.email,
      password: firstUserPassword,
    },
  });

  const others = otherUsers.length
    ? await db
        .insert(user)
        .values(otherUsers.map((u) => ({ name: u.name, email: u.email })))
        .returning()
    : [];

  return [res.user, ...others];
}
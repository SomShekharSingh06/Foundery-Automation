import fs from "fs";
import { google } from "googleapis";
import readline from "readline";

const CREDENTIALS_PATH = "credentials.json";
const TOKEN_PATH = "token.json";
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const REDIRECT_URI = "http://localhost:3000/auth/google/callback";

function createOAuthClient() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
  const { client_id, client_secret } = credentials.web;
  return new google.auth.OAuth2(client_id, client_secret, REDIRECT_URI);
}

async function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this URL:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve, reject) => {
    rl.question("Enter the code from that page here: ", async (code) => {
      rl.close();
      try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
        console.log("✅ Token stored to", TOKEN_PATH);
        resolve(oAuth2Client);
      } catch (err) {
        reject(err);
      }
    });
  });
}

async function loadOrGetToken(oAuth2Client) {
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }
  return await getNewToken(oAuth2Client);
}

export class OtpValidation {
  constructor(opts = {}) {
    this.pollIntervalMs = opts.pollIntervalMs || 2000;
    this.timeout = opts.timeout || 60000;
    this.oAuth2Client = createOAuthClient();
    this.authedClient = null;
    this.gmail = null;
  }

  async ensureAuth() {
    if (!this.authedClient) {
      this.authedClient = await loadOrGetToken(this.oAuth2Client);
      this.gmail = google.gmail({ version: "v1", auth: this.authedClient });
    }
    return this.authedClient;
  }

  async getOtp(email) {
    await this.ensureAuth();
    const start = Math.floor(Date.now() / 1000);
    console.log("🔎 Waiting for NEW OTP email…");
    const deadline = Date.now() + this.timeout;
    
    while (Date.now() < deadline) {
      const res = await this.gmail.users.messages.list({
        userId: "me",
        q: `from:dev@thefoundery.in after:${start}`,
        maxResults: 5,
      });
      const messages = res.data.messages || [];
      
      if (messages.length) {
        const msgRes = await this.gmail.users.messages.get({
          userId: "me",
          id: messages[0].id,
          format: "full",
        });
        const text = msgRes.data.snippet || "";
        const otp = text.match(/\b\d{6}\b/)?.[0];
        
        if (otp) {
          console.log("✅ Latest OTP found:", otp);
          return otp;
        }
      }
      console.log("⌛ Waiting for OTP...");
      await new Promise((r) => setTimeout(r, this.pollIntervalMs));
    }
    throw new Error("❌ OTP not found within timeout");
  }
}
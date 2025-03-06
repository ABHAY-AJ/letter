const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.CALLBACK_URL
);

const drive = google.drive({ version: "v3", auth: oauth2Client });

async function uploadToDrive(accessToken, content, title) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  const fileMetadata = {
    name: `${title}.docx`,
    mimeType: "application/vnd.google-apps.document",
  };

  const media = {
    mimeType: "text/plain",
    body: content,
  };

  const file = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id",
  });

  return file.data.id;
}


module.exports = { uploadToDrive };

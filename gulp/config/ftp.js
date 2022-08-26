import 'dotenv/config'

export let configFTP = {
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  parallel: 5,
}

export let ftpFolder = process.env.FTP_FOLDER

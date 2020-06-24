import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD,
    },
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "developchb@innogrid.com", //참고 : SendGrid Authenticate Your Domain에서 설정 후 DNS설정해야 아무 가짜이메일로도 변경 가능한듯 //현재는 Single Sender Verification을 통해서 해당 메일만 되도록 설정함
    to: address,
    subject: "🔒Login Secret for InnoApp🔒",
    html: `안녕하세요! 로그인 비밀키는 다음과 같습니다.<br/><br/> <strong>${secret}</strong>.<br/><br/> 로그인 하시려면 위 코드를 입력해주세요.`,
  };
  return sendMail(email);
};

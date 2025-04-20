import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const generetRefressToken = (data: object) => {
  const RefressToken = jwt.sign(data, process.env.TOKEN_PRIVET_KEY!, {
    expiresIn: "1y",
  });
  return RefressToken;
};

export const getDataFromToken = (data: string) => {
  console.log("this is token", data);
  const decoded = jwtDecode(data);
  console.log("data in toke", decoded);
  return decoded;
};

import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const generetRefressToken = (data: object) => {
  const RefressToken = jwt.sign(data, process.env.TOKEN_PRIVET_KEY!, {
    expiresIn: "365d",
  });
  // const RefressToken = jwt.sign(
  //   data,
  //   "43f26d206d90d10354e42c69dbb7bf17be3a0b7de0acec6fcc81cad0dc70a4c5f360cebfa5e5aecaa6ef01bb8ad3e3ff61729814d39f3760e16f79a27cf4a3f1",
  //   {
  //     expiresIn: "365d",
  //   }
  // );
  return RefressToken;
};
export function MyCookiesComponent() {
  const cookieStore: any = cookies();
  const cooki = cookieStore.get("RefresToken").value || "";
  const decoded = jwtDecode(cooki);
  return decoded;
}

export const getDataFromToken = (data: string) => {
  const decoded = jwtDecode(data);
  return decoded;
};

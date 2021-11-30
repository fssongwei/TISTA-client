import axios, { AxiosResponse } from "axios";
interface UploadResponse {
  status: string;
  claimId: string;
}

export interface ErrorResponse {
  STATUS: string;
  msg: string;
}

const uploadClaim = async (
  name: string,
  id: string,
  comment: string,
  file: File
): Promise<AxiosResponse<UploadResponse, ErrorResponse>> => {
  let param = new FormData();
  param.append("file", file);
  param.append("name", name);
  param.append("patientId", id);
  param.append("comment", comment);

  const res = axios.post("/api/upload", param);
  return res;
};

export default uploadClaim;

import faker from "faker";
import axios, { AxiosResponse } from "axios";

interface ClaimData {
  claimId: string;
  name: string;
  filePath: string;
  riskLevel: RISK_LEVEL;
}

export interface Query {
  search?: string;
  status?: string[];
  level?: string[];
  page?: number;
  pageSize?: number;
}

export interface Pager {
  totalCount: number;
  totalPage: number;
  currentPage: number;
  pageSize: number;
}

export interface ClaimDatabase {
  tableData: ClaimData[];
  pagerData: Pager;
}

export type TableData = ClaimData[];

enum RISK_LEVEL {
  NO_RISK,
  LOW_RISK,
  MID_RISK,
  HIGH_RISK,
}

export interface Report {
  reportId: string;
  riskLevel: string;
  patientName: string;
  patientId: string;
  reviewStatus: string;
  claim: string;
  comment: string;
  providerName: string;
  facilityLocation: string;
  netValue: string;
  billTimeDifference: string;
}

const fetchReport = async (claimId: String): Promise<Report> => {
  const data = (await axios.get<Report>("/api/report", { params: { claimId } }))
    .data;
  return data;
};

export default fetchReport;

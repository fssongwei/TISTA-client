import faker from "faker";
import axios from "axios";

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

const fetchData = async (query: Query): Promise<any> => {
  const data = (await axios.get("/api/claims", { params: query })).data;
  return data;
};

export default fetchData;

import faker from "faker";

interface PatientData {
  id: string;
  name: string;
  update: Date;
  status: STATUS;
  reviewer: string;
}

export interface Query {
  search?: string;
  status?: string[];
  reviewers?: string[];
  startDate?: Date;
  endDate?: Date;
  page?: number;
  pageSize?: number;
}

export interface Pager {
  totalCount: number;
  totalPage: number;
  currentPage: number;
  pageSize: number;
}

export interface PatientDatabase {
  tableData: PatientData[];
  pagerData: Pager;
}

export type TableData = PatientData[];

enum STATUS {
  NORMAL,
  REVIEWING,
  FRAUD,
}

const fetchData = ({
  search,
  status,
  reviewers,
  startDate,
  endDate,
  page,
  pageSize,
}: Query): Promise<any> => {
  return new Promise<PatientDatabase>((resolve) => {
    setTimeout(() => {
      let tableData: PatientData[] = [];
      for (let i = 0; i < (pageSize || 10); i++) {
        tableData.push({
          id: ((page || 0) * 10 + i).toString(),
          name: faker.name.findName(),
          update: faker.date.past(),
          status:
            Math.random() < 0.3
              ? STATUS.NORMAL
              : Math.random() < 0.5
              ? STATUS.REVIEWING
              : STATUS.FRAUD,
          reviewer: faker.name.findName(),
        });
      }

      let pagerData = {
        totalCount: 1000,
        totalPage: 100,
        currentPage: page || 1,
        pageSize: pageSize || 10,
      };
      resolve({ tableData, pagerData });
    }, Math.random() * 500 + 100); // simulate network latency
  });
};

export default fetchData;

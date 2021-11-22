interface UploadResponse {
  status: string;
  claimId: string;
}

const uploadClaim = (
  name: string,
  id: string,
  comment: string,
  file: File
): Promise<any> => {
  return new Promise<UploadResponse>((resolve) => {
    setTimeout(() => {
      const data = {
        status: "SUCCESS",
        claimId: "123456",
      };
      //   let tableData: PatientData[] = [];
      //   for (let i = 0; i < (pageSize || 10); i++) {
      //     tableData.push({
      //       id: ((page || 0) * 10 + i).toString(),
      //       name: faker.name.findName(),
      //       update: faker.date.past(),
      //       status:
      //         Math.random() < 0.3
      //           ? STATUS.NORMAL
      //           : Math.random() < 0.5
      //           ? STATUS.REVIEWING
      //           : STATUS.FRAUD,
      //       reviewer: faker.name.findName(),
      //     });
      //   }
      //   let pagerData = {
      //     totalCount: 1000,
      //     totalPage: 100,
      //     currentPage: page || 1,
      //     pageSize: pageSize || 10,
      //   };
      resolve(data);
    }, Math.random() * 500 + 100); // simulate network latency
  });
};

export default uploadClaim;

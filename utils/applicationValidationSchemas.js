
module.exports = {
  createSchema: {
    adNo: { type: "string", optional: false },
    jobId: { type: "number", optional: false },
  },
  personalInfoCheck: {
    name: { type: "string", optional: false },
    corAddress: { type: "string", optional: false },
    phone: { type: "string", optional: false },
    fax: { type: "string", optional: false },
    email: { type: "string", optional: true },
    DOB: { type: "string" ,optional: false},
    perAddress: { type: "string", optional: false },
    secPhone: { type: "string", optional: true },
    secFax: { type: "string", optional: true },
    secEmail: { type: "string", optional: true },
    martialStatus: { type: "string", optional: false },
    category: { type: "string", optional: false },
    pwd: { type: "string", optional: true },
    pwdDoc: { type: "string", optional: true, field: "pwd" },
    govtIdCard: { type: "string", optional: false },
    photo: { type: "string", optional: false },
    appId: { type: "string", optional: false },
  }
};

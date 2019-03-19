export { fetchReferralList, fetchFormTemplateList };

const fetchReferralList = totalListOfRefferals => {
  const referralListTable = {
    headerRow: ["ID", "Form ID", "Form Name", "Created By", "Created Date"],
    footerRow: ["ID", "Form ID", "Form Name", "Created By", "Created Date"],
    dataRows: []
  };

  totalListOfRefferals.forEach(ref => {
    let data = [],
      _id,
      form_id,
      form_Name,
      created_By,
      created_Date;

    _id = ref._id;
    form_id = ref.forminstance.formID;
    form_Name = "Form Name";
    created_By = ref.forminstance.audit ? ref.forminstance.audit.createdBy : "";
    created_Date = ref.forminstance.audit
      ? ref.forminstance.audit.dateCreated
      : "";

    data.push(_id, form_id, form_Name, created_By, created_Date);
    referralListTable.dataRows.push(data);
  });

  return referralListTable;
};

const fetchFormTemplateList = totalListOfFormTemplate => {
  const formTemplateList = {
    headerRow: ["ID", "Form Name", "Description", "Updated By", "Date Created"],
    footerRow: ["ID", "Form Name", "Description", "Updated By", "Date Created"],
    dataRows: []
  };

  let formData = totalListOfFormTemplate;

  formData.forEach(ref => {
    let data = [],
      _id,
      form_Name,
      form_Description,
      date_Created,
      updated_By;

    _id = ref.form.accountID;
    form_Name = ref.form.name;
    form_Description = ref.form.description;
    date_Created =
      ref.form.audit.dateCreated != undefined
        ? ref.form.audit.dateCreated
        : "Sukhdev";
    updated_By =
      ref.form.audit.updatedBy != "null"
        ? ref.form.audit.updatedBy
        : "No data from mongo";

    data.push(_id, form_Name, form_Description, updated_By, date_Created);
    formTemplateList.dataRows.push(data);
  });
  console.log("Hello");

  return formTemplateList;
};

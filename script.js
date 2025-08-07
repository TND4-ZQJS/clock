async function fillPDF() {
  const policyNo1 = document.getElementById("PolicyNo1").value;
  const insured1 = document.getElementById("Insured1").value;
  const isSpouse = document.getElementById("Relationship1_spouse").checked;
  const isChargeAll = document.getElementById("Onetimecharge_alloutstanding").checked;

  const existingPdfBytes = await fetch("Credit Card Enrolment Form_LF4092_200524_fillable.pdf").then(res => res.arrayBuffer());

  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  form.getTextField("PolicyNo1").setText(policyNo1);
  form.getTextField("Insured1").setText(insured1);

  if (isSpouse) {
    form.getCheckBox("Relationship1_spouse").check();
  } else {
    form.getCheckBox("Relationship1_spouse").uncheck();
  }

  if (isChargeAll) {
    form.getCheckBox("Onetimecharge_alloutstanding").check();
  } else {
    form.getCheckBox("Onetimecharge_alloutstanding").uncheck();
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Filled_Credit_Card_Form.pdf";
  link.click();
}

import fileProvider from "@data-access/file-provider";
const handleDownload = (file, nameFile) => {
  fileProvider
    .downloadFile(file)
    .then((s) => {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = s;
      if (nameFile) {
        a.download = nameFile;
      }
      a.click();
      window.URL.revokeObjectURL(s);
      document.body.removeChild(a);
    })
    .catch((e) => {});
};
const downLoadFile = (blob, nameFile) => {
  let link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = nameFile;
  link.click();
};
export { handleDownload, downLoadFile };
// export default handleDownload;

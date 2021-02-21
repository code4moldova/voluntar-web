export function downloadCsv(blob: Blob, fileName: string) {
  const child = document.createElement('a');
  child.setAttribute('href', window.URL.createObjectURL(blob));
  child.setAttribute('download', fileName + '.csv');
  child.click();
}

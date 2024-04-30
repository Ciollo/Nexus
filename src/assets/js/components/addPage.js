// export function addPage() {
//   const link = document.createElement("a");
// //   const content = document.querySelector("textarea").value;
//   const content = '<html>test</html>';
//   const file = new Blob([content], { type: "html" });
//   link.href = URL.createObjectURL(file);
//   link.download = "sample.html";
//   link.click();
//   URL.revokeObjectURL(link.href);
// }

export function addPage() {
  const content = '<html>test</html>';

  fetch('/saveFile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filename: 'sample.html', content: content }),
  })
  .then(response => response.json())
  .then(data => console.log(data.message))
  .catch((error) => {
    console.error('Error:', error);
  });
}
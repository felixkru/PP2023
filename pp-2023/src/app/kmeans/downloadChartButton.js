const handleClick = () => {
  console.log("Download Button betätigt.");
};

export default function DownloadButton() {
  return (
    <button type="button" className="button" onClick={handleClick}>
      Download Chart
    </button>
  );
}

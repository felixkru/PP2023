const handleClick = () => {
  console.log("Download Button betätigt.");
};

export default function DownloadButton() {
  return (
    <button
      id="downloadButton"
      type="button"
      className="button mt-5"
      onClick={handleClick}
    >
      Download Chart
    </button>
  );
}

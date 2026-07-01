function downloadClient() {
    const status = document.getElementById("status");

    status.innerHTML = "Preparing download...";

    setTimeout(() => {
        status.innerHTML = "Download started!";

        // fake file download (replace with real link later)
        const link = document.createElement("a");
        link.href = "https://example.com";
        link.download = "CometClient.zip";
        link.click();

    }, 1500);
}

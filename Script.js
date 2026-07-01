// download button fake action
function downloadClient() {
    const status = document.getElementById("status");
    status.innerHTML = "Preparing download...";

    setTimeout(() => {
        status.innerHTML = "Starting download...";

        const a = document.createElement("a");
        a.href = "https://example.com";
        a.download = "CometClient.zip";
        a.click();

    }, 1200);
}

// ✨ scroll reveal animation (THIS fixes "nothing cool")
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
});

document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
});

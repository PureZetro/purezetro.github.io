document.getElementById("skinForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();

  if (!username) return;

  document.getElementById("displayName").textContent = username;

  // Crafatar uses UUID, but supports username as well
  const avatarUrl = `https://crafatar.com/avatars/${username}?overlay`;
  const bodyUrl = `https://crafatar.com/renders/body/${username}?overlay`;
  const skinUrl = `https://crafatar.com/skins/${username}`;

  document.getElementById("avatar").src = avatarUrl;
  document.getElementById("body").src = bodyUrl;
  document.getElementById("skin").src = skinUrl;

  document.getElementById("result").classList.remove("hidden");
});

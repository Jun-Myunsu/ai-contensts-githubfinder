import { truncateText, formatNumber } from "../utils/dataFormat.js";

// User 정보 적용
export function updateUserInfo(user) {
  document.querySelector("#public_repos").textContent = formatNumber(
    user.publicRepos
  );
  document.querySelector("#public_gists").textContent = formatNumber(
    user.publicGists
  );
  document.querySelector("#followers").textContent = formatNumber(
    user.followers
  );
  document.querySelector("#following").textContent = formatNumber(
    user.following
  );

  document.querySelector("#user_company").textContent = user.company;
  document.querySelector("#user_website").textContent = user.blog;
  document.querySelector("#user_location").textContent = user.location;
  document.querySelector("#user_since").textContent = user.createdAt;

  if (user.avatarUrl)
    document.querySelector("#avatar_url").src = user.avatarUrl;
  else document.querySelector("#avatar_url").src = "./images/sample.png";
}

// Repo 적용
export function addRepo(repo) {
  const reposContainer = document.querySelector("#repos");

  if (!reposContainer) {
    console.error("repos 컨테이너가 존재하지 않습니다.");
    return;
  }

  const repoItem = document.createElement("div");
  repoItem.classList.add("repo-item");

  repoItem.innerHTML = `
    <div class="repo-header">
        <div class="repo-name" key="${repo.id}" ><a href="${
    repo.url
  }" target="_blank">${repo.name}${
    repo.description ? "(" + truncateText(repo.description, 45) + ")" : ""
  }</a></div>
        <div class="repo-stats">
            <span>⭐ ${formatNumber(repo.stars)}</span>
            <span>👁 ${formatNumber(repo.watchers)}</span>
            <span>🍴 ${formatNumber(repo.forks)}</span>
        </div>
    </div>
  `;

  // html_url
  reposContainer.appendChild(repoItem);
}

// repos 삭제 (re 조회시 기존 목록 삭제)
export function clearRepos() {
  const reposContainer = document.querySelector("#repos");
  reposContainer.innerHTML = "";
  reposContainer.innerHTML = `<h3>Latest Repos</h3>`;
}

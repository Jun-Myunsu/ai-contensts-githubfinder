import { fetchGitHubUser, fetchUserRepos } from "./apis/githubFindApi.js"; // github api 데이터 가져오기
import { updateUserInfo, addRepo, clearRepos } from "./view/render.js"; // 화면 그리기
import { GitHubUser } from "./classes/GitHubUser.js";

const userInput = document.querySelector("#search-user");
const searchButton = document.querySelector("#search-btn");
const loadingEl = document.querySelector("#loading");

const viewProfileBtn = document.querySelector("#view-profile-btn");
let userProfileUrl = "";

// Search
async function searchUser() {
  const username = userInput.value.trim();
  if (!username) return;

  loadingEl.style.display = "block";

  try {
    const user = await fetchGitHubUser(username);
    const repos = await fetchUserRepos(username);
    const gitHubUser = new GitHubUser(user, repos);
    userProfileUrl = gitHubUser.profileUrl;
    console.log(gitHubUser);

    clearRepos();
    updateUserInfo(gitHubUser);
    gitHubUser.repos.forEach(addRepo);
  } catch (error) {
    console.error(error.message);
  } finally {
    loadingEl.style.display = "none";
  }
}

// Search Event
searchButton.addEventListener("click", searchUser);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchUser();
});

// View Profile
viewProfileBtn.addEventListener("click", () => {
  // console.log(userProfileUrl);
  if (userProfileUrl) {
    window.open(userProfileUrl, "_blank");
  }
});

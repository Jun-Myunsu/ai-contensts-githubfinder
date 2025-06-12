// github user 찾기
export async function fetchGitHubUser(username) {
  const searchBox = document.querySelector(".search-box");
  const userInput = document.querySelector("#search-user");

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("사용자를 찾을 수 없습니다.");
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    userInput.value = "";
    const noUserMsg = document.createElement("div");
    noUserMsg.textContent = "사용자를 찾을 수 없습니다.";
    noUserMsg.classList.add("no-user");
    searchBox.appendChild(noUserMsg);

    // 2초 후 메시지 자동 삭제
    setTimeout(() => {
      searchBox.removeChild(noUserMsg);
    }, 2000);

    console.error("error[gitUser]: ", error);
    return null;
  }
}

// 최신 repo 5개 가져오기
export async function fetchUserRepos(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=5`
    );
    if (!response.ok) throw new Error("Repo를 찾을 수 없습니다.");
    return await response.json();
  } catch (error) {
    console.error("error[repo] :", error);
  }
}

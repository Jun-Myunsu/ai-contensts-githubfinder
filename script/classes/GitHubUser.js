import { GitHubRepo } from "./GitHubRepo.js";

export class GitHubUser {
  constructor(userData, repoData = []) {
    Object.assign(this, {
      username: userData.login,
      id: userData.id,
      avatarUrl: userData.avatar_url,
      profileUrl: userData.html_url,
      name: userData.name,
      company: userData.company,
      blog: userData.blog,
      location: userData.location,
      email: userData.email,
      hireable: userData.hireable,
      publicRepos: userData.public_repos,
      publicGists: userData.public_gists,
      followers: userData.followers,
      following: userData.following,
      createdAt: new Date(userData.created_at).toLocaleString("ko-KR"),
      updatedAt: new Date(userData.updated_at).toLocaleString("ko-KR"),
    });

    this.repos = repoData.map((repo) => new GitHubRepo(repo));
  }

  getProfileSummary() {
    return `${this.name} (@${this.username}) - ${this.followers} followers, ${this.publicRepos} repositories`;
  }

  getReposList() {
    return this.repos.length > 0
      ? this.repos
          .map((repo) => `🔹 ${repo.name} (${repo.stars || 0}⭐)`)
          .join("\n")
      : "저장소가 없습니다.";
  }
}

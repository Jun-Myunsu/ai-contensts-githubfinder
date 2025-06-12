export class GitHubRepo {
  constructor({
    id,
    name,
    description,
    stargazers_count,
    watchers_count,
    forks_count,
    html_url,
  }) {
    this.id = id;
    this.name = name;
    this.description = description || "";
    this.stars = stargazers_count;
    this.watchers = watchers_count;
    this.forks = forks_count;
    this.url = html_url;
  }

  getSummary() {
    return `${this.name} ⭐${this.stars} 🍴${this.forks}`;
  }
}

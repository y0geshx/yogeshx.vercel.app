/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

export async function getPinnedRepos() {
  const res = await axios.get(
    "https://gist.githubusercontent.com/vibrantfix/e31fa7e26c3291c93b325aef1c47ece8/raw/959d10c1cb32e075b61b3282d0553d74986e1fb8/vibrantfix"
  );
  const repos = res.data;

  return repos.map((repo: any) => {
    return {
      name: repo.name,
      description: repo.description,
      url: repo.link,
      stars: repo.stars,
      forks: repo.forks,
    };
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

export async function getPinnedRepos() {
  const res = await axios.get(
    "https://gist.githubusercontent.com/vibrantfix/83d50091e011b11075626bbc5aab4724/raw/5c8076861028e827bc3ed598aa03a3dcc20e1739/vibrantfix"
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

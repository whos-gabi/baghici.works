import { Octokit, type RestEndpointMethodTypes } from "@octokit/rest";

export type ShowcaseRepo = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage?: string | null;
  stars: number;
  language?: string | null;
  owner: string;
  topics: string[];
  updatedAt: string;
};

export type ShowcaseOrg = {
  id: number;
  login: string;
  avatarUrl: string;
  url: string;
  description: string | null;
  repos: ShowcaseRepo[];
};

const username = process.env.GITHUB_USERNAME || "whos-gabi";
const token = process.env.GITHUB_TOKEN;

const octokit = new Octokit({
  auth: token || undefined,
  userAgent: "baghici-works/1.0.0",
  request: {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github+json",
    },
  },
  mediaType: {
    previews: ["mercy"], // ensures topics are returned
  },
});

export async function getShowcaseData(): Promise<{
  repos: ShowcaseRepo[];
  orgs: ShowcaseOrg[];
}> {
  if (!token) {
    console.warn("GITHUB_TOKEN missing: skipping GitHub fetch.");
    return { repos: [], orgs: [] };
  }

  try {
    const userReposPromise = octokit.paginate(octokit.repos.listForUser, {
      username,
      sort: "updated",
      per_page: 100,
    });

    const adminOrgsPromise = octokit
      .paginate(octokit.orgs.listMembershipsForAuthenticatedUser, {
        state: "active",
        role: "admin",
        per_page: 100,
      })
      .then((memberships) =>
        memberships
          .map((m) => m.organization?.login)
          .filter((login): login is string => Boolean(login)),
      );

    const [userRepos, adminOrgLogins] = await Promise.all([
      userReposPromise,
      adminOrgsPromise,
    ]);

    const orgReposNested = await Promise.all(
      adminOrgLogins.map((org) =>
        octokit.paginate(octokit.repos.listForOrg, {
          org,
          type: "public",
          sort: "updated",
          per_page: 100,
        }),
      ),
    );

    const orgDetails = await Promise.all(
      adminOrgLogins.map(async (org) => {
        const res = await octokit.orgs.get({ org });
        return {
          id: res.data.id,
          login: res.data.login,
          avatarUrl: res.data.avatar_url,
          url: res.data.html_url,
          description: res.data.description ?? null,
        };
      }),
    );

    type ApiRepo =
      RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"][number];

    const normalizeRepo = (repo: ApiRepo): ShowcaseRepo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description ?? null,
      url: repo.html_url,
      homepage: repo.homepage,
      stars: repo.stargazers_count ?? 0,
      language: repo.language,
      owner: repo.owner?.login ?? username,
      topics: Array.isArray(repo.topics) ? repo.topics : [],
      updatedAt:
        repo.updated_at ??
        repo.pushed_at ??
        repo.created_at ??
        new Date().toISOString(),
    });

    const userReposNormalized = userRepos
      .filter((repo) => !repo.fork)
      .map(normalizeRepo)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() ||
          b.stars - a.stars,
      )
      .slice(0, 40);

    const orgs: ShowcaseOrg[] = orgDetails.map((org, index) => {
      const reposForOrg = (orgReposNested[index] || [])
        .filter((repo) => !repo.fork)
        .map(normalizeRepo)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() -
              new Date(a.updatedAt).getTime() || b.stars - a.stars,
        )
        .slice(0, 10);

      return { ...org, repos: reposForOrg };
    });

    return { repos: userReposNormalized, orgs };
  } catch (error) {
    console.error("Failed to load GitHub data:", error);
    return { repos: [], orgs: [] };
  }
}


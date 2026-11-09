# Harinath Reddy Anugula — Portfolio

A responsive, dependency-free portfolio website. Resume content is stored in [`data/portfolio.json`](./data/portfolio.json); the original PDF is linked from the site.

## Run locally

From this directory, start any static HTTP server. For example, with Python:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. The portfolio loads its content from JSON, so it must be served over HTTP rather than opened directly as a `file://` page.

## Free hosting with GitHub Pages

1. Create a GitHub repository and upload the contents of this folder.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After the deployment finishes, GitHub Pages will show the public URL in the Pages settings.

The site uses only static HTML, CSS, JavaScript, and JSON, so no server, build step, paid service, or API key is required. Keep the resume PDF in the `resume/` folder so the résumé link continues to work.

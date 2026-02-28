exports.handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const GITHUB_REPO = "RoboPlayz12345/blog-connect";
    const GITHUB_FILE = "posts.json";
    const [owner, repo] = GITHUB_REPO.split("/");
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${GITHUB_FILE}`;

    if (!GITHUB_TOKEN) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "GitHub token not configured in Netlify environment variables" })
        };
    }

    try {
        const { posts, password, checkOnly } = JSON.parse(event.body);

        // Check password against Netlify environment variable
        if (password !== ADMIN_PASSWORD) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Incorrect password" })
            };
        }

        // If this is just a login check, return success without touching GitHub
        if (checkOnly) {
            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        }

        const content = btoa(unescape(encodeURIComponent(JSON.stringify(posts, null, 2))));

        // Get current file SHA
        let sha = "";
        const getRes = await fetch(apiUrl, {
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Accept": "application/vnd.github.v3+json"
            }
        });
        if (getRes.ok) {
            const data = await getRes.json();
            sha = data.sha;
        }

        // Update the file on GitHub
        const updateRes = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `Update blog posts - ${new Date().toLocaleString()}`,
                content: content,
                ...(sha && { sha })
            })
        });

        if (!updateRes.ok) {
            const err = await updateRes.json();
            return {
                statusCode: 500,
                body: JSON.stringify({ error: err.message || "Failed to save to GitHub" })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};
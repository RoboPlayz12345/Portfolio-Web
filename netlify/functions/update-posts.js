exports.handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ error: "Method Not Allowed" })
        };
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO || "RoboPlayz12345/blog-connect";
    const GITHUB_FILE = "posts.json";
    const [owner, repo] = GITHUB_REPO.split("/");
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${GITHUB_FILE}`;

    if (!GITHUB_TOKEN) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "GitHub token not configured",
                message: "Set GITHUB_TOKEN in Netlify environment variables. Go to Netlify Site Settings > Build & Deploy > Environment."
            })
        };
    }

    try {
        const { posts } = JSON.parse(event.body);
        
        if (!posts || !Array.isArray(posts)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Invalid request format. Expected array of posts." })
            };
        }

        // Remove image data URLs and keep only URLs
        const sanitizedPosts = posts.map(post => ({
            ...post,
            Image: post.Image && post.Image.startsWith('http') 
                ? post.Image 
                : null  // Remove base64 images, keep only URLs
        }));

        const content = btoa(unescape(encodeURIComponent(JSON.stringify(sanitizedPosts, null, 2))));

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
        } else if (getRes.status !== 404) {
            // 404 is OK (file doesn't exist yet), other errors are problems
            const err = await getRes.json();
            return {
                statusCode: getRes.status,
                body: JSON.stringify({ 
                    error: "Failed to retrieve GitHub file",
                    details: err.message 
                })
            };
        }

        // Update or create the file on GitHub
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
                statusCode: updateRes.status,
                body: JSON.stringify({ 
                    error: "Failed to save to GitHub",
                    message: err.message,
                    status: updateRes.status
                })
            };
        }

        const result = await updateRes.json();
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true,
                message: "Posts updated successfully",
                commit: result.commit.sha
            })
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "Server error: " + err.message,
                stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
            })
        };
    }
};
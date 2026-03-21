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

        // Get current file SHA and previous images
        let sha = "";
        let previousImages = [];
        const getRes = await fetch(apiUrl, {
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Accept": "application/vnd.github.v3+json"
            }
        });
        if (getRes.ok) {
            const data = await getRes.json();
            sha = data.sha;
            try {
                // Parse previous posts.json to get old images
                const oldPosts = JSON.parse(decodeURIComponent(escape(atob(data.content.replace(/\n/g, '')))));
                previousImages = oldPosts.map(post => post.Image).filter(url => url && url.startsWith('http'));
            } catch (e) {
                previousImages = [];
            }
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

        // Find images to delete (in previousImages but not in sanitizedPosts)
        const currentImages = sanitizedPosts.map(post => post.Image).filter(url => url && url.startsWith('http'));
        const imagesToDelete = previousImages.filter(url => !currentImages.includes(url));

        // Helper to extract GitHub file path from image URL
        function getImagePathFromUrl(url) {
            // Example: https://raw.githubusercontent.com/owner/repo/main/images/12345-filename.jpg
            const match = url.match(/githubusercontent.com\/[\w-]+\/[\w-]+\/main\/(.+)$/);
            return match ? match[1] : null;
        }

        // Delete images from GitHub
        for (const imageUrl of imagesToDelete) {
            const imagePath = getImagePathFromUrl(imageUrl);
            if (!imagePath) continue;
            const imageApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${imagePath}`;
            // Get SHA for the image file
            const imageRes = await fetch(imageApiUrl, {
                headers: {
                    "Authorization": `token ${GITHUB_TOKEN}`,
                    "Accept": "application/vnd.github.v3+json"
                }
            });
            if (imageRes.ok) {
                const imageData = await imageRes.json();
                const delRes = await fetch(imageApiUrl, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `token ${GITHUB_TOKEN}`,
                        "Accept": "application/vnd.github.v3+json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: `Delete unused blog image - ${new Date().toLocaleString()}`,
                        sha: imageData.sha,
                        branch: "main"
                    })
                });
                // Optionally, check delRes.ok and log errors
            }
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
                commit: result.commit.sha,
                imagesDeleted: imagesToDelete
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
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
    const [owner, repo] = GITHUB_REPO.split("/");

    if (!GITHUB_TOKEN) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "GitHub token not configured. Set GITHUB_TOKEN in Netlify environment variables." 
            })
        };
    }

    try {
        const { imageData, fileName } = JSON.parse(event.body);

        if (!imageData || !fileName) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing imageData or fileName" })
            };
        }

        // Remove data:image/...;base64, prefix if present
        const base64Data = imageData.includes(',') 
            ? imageData.split(',')[1] 
            : imageData;

        // Generate unique filename to avoid conflicts
        const timestamp = Date.now();
        const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueFileName = `images/${timestamp}-${cleanFileName}`;
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${uniqueFileName}`;

        // Upload image to GitHub
        const uploadRes = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `Upload blog image - ${new Date().toLocaleString()}`,
                content: base64Data,
                branch: "main"
            })
        });

        if (!uploadRes.ok) {
            const err = await uploadRes.json();
            return {
                statusCode: 500,
                body: JSON.stringify({ 
                    error: err.message || "Failed to upload image to GitHub",
                    details: err
                })
            };
        }

        const uploadData = await uploadRes.json();
        const imageUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${uniqueFileName}`;

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true,
                imageUrl: imageUrl,
                fileName: uniqueFileName
            })
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "Image upload failed: " + err.message 
            })
        };
    }
};

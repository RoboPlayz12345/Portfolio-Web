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
        // Debug: log incoming event
        console.log("Received event:", JSON.stringify(event));
        let imageData, fileName;
        try {
            ({ imageData, fileName } = JSON.parse(event.body));
        } catch (parseErr) {
            console.error("Failed to parse event.body:", event.body, parseErr);
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Invalid JSON in request body", details: parseErr.message })
            };
        }

        if (!imageData || !fileName) {
            console.error("Missing imageData or fileName", { imageData, fileName });
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing imageData or fileName", imageData, fileName })
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

        // Debug: log upload details
        console.log("Uploading to GitHub:", { apiUrl, uniqueFileName });

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
            let err;
            try {
                err = await uploadRes.json();
            } catch (jsonErr) {
                err = { message: "Failed to parse error response", raw: await uploadRes.text() };
            }
            console.error("GitHub upload failed", { status: uploadRes.status, err });
            return {
                statusCode: 500,
                body: JSON.stringify({ 
                    error: err.message || "Failed to upload image to GitHub",
                    details: err,
                    status: uploadRes.status
                })
            };
        }

        const uploadData = await uploadRes.json();
        const imageUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${uniqueFileName}`;

        // Debug: log success
        console.log("Image uploaded successfully", { imageUrl, uploadData });

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true,
                imageUrl: imageUrl,
                fileName: uniqueFileName,
                uploadData
            })
        };

    } catch (err) {
        console.error("Image upload failed:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "Image upload failed: " + err.message,
                details: err.stack || err
            })
        };
    }
};

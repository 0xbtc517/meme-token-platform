document.getElementById('generateMemeBtn').addEventListener('click', async function () {
    const memeText = document.getElementById('memeInput').value;

    if (!memeText) {
        alert("Please enter some text for your meme.");
        return;
    }

    try {
        // 发起对 Grok API 的请求
        const response = await fetch('https://api.grok.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `xai-yOPzm1xU213PMZxuWuDxJJSzElVaujmFybSziE1n5JvzdWJektnkA24kS6a2gnCuHphbHGOJQoBTuR0c`, // 替换为您的 Grok API 密钥
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "grok-1", // Grok 模型名称
                messages: [
                    { role: "system", content: "You are a meme generator AI." },
                    { role: "user", content: `Create a meme image description: ${memeText}` }
                ],
                max_tokens: 150
            })
        });

        // 检查 API 响应状态
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // 解析响应数据
        const data = await response.json();
        console.log("Grok API Response:", data);

        // 提取生成的文本或图片 URL（假设 Grok 返回文本描述或图片链接）
        const generatedMemeDescription = data.choices[0].message.content;

        // 使用占位图片显示文本（仅示例用途）
        const memeImageUrl = `https://via.placeholder.com/300x300.png?text=${encodeURIComponent(generatedMemeDescription)}`;
        document.getElementById('memeImage').src = memeImageUrl;

    } catch (error) {
        console.error("Error fetching from Grok API:", error.message);
        alert("Failed to generate meme. Please try again later.");
    }
});

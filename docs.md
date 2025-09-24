https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/image-generation?hl=zh-cn

https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference?hl=zh-cn#request


cat << EOF > request.json
{
    "contents": [
        {
            "role": "user",
            "parts": [
            ]
        }
    ]
    , "generationConfig": {
        "temperature": 1
        ,"maxOutputTokens": 32768
        ,"responseModalities": ["TEXT", "IMAGE"]
        ,"topP": 0.95
    },
    "safetySettings": [
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "OFF"
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "OFF"
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "OFF"
        },
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "OFF"
        }
    ]
}
EOF

API_KEY=""
MODEL_ID="gemini-2.5-flash-image-preview"


curl \
-X POST \
-H "Content-Type: application/json" \
"https://aiplatform.googleapis.com/v1/projects/calude-test-457009/locations/global/publishers/google/models/${MODEL_ID}:generateContent?key=${API_KEY}" -d '@request.json'
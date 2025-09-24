from google.genai import types
from google import genai
from PIL import Image
from io import BytesIO

client = genai.Client()

prompt = "去掉背景，保留前景"

image = Image.open('/Users/hyoldman/Downloads/test.png')


generate_content_config = types.GenerateContentConfig(
  temperature = 0,
  top_p = 0,
  max_output_tokens = 32768,
  response_modalities = ["TEXT", "IMAGE"],
)


response = client.models.generate_content(
    config = generate_content_config,
    model="gemini-2.5-flash-image-preview",
    contents=[prompt, image],
)

for part in response.candidates[0].content.parts:
  if part.text is not None:
    print(part.text)
  elif part.inline_data is not None:
    image = Image.open(BytesIO(part.inline_data.data))   
    image.save("./generated_image.png")
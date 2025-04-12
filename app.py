from flask import Flask, request, jsonify
from sparkai.llm.llm import ChatSparkLLM
from sparkai.core.messages import ChatMessage
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

# 星火大模型配置
SPARKAI_URL = 'wss://spark-api.xf-yun.com/v3.5/chat'
SPARKAI_APP_ID = 'ca91eee7'
SPARKAI_API_SECRET = 'ODZiYTEyYWE4MjNlNWY1MDZiNWFiNjUz'
SPARKAI_API_KEY = '1eb93aaf90103f4317757c1d1a2196fb'
SPARKAI_DOMAIN = 'generalv3.5'

# 初始化星火大模型
spark = ChatSparkLLM(
    spark_api_url=SPARKAI_URL,
    spark_app_id=SPARKAI_APP_ID,
    spark_api_key=SPARKAI_API_KEY,
    spark_api_secret=SPARKAI_API_SECRET,
    spark_llm_domain=SPARKAI_DOMAIN,
    streaming=False,
)

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/chat", methods=["POST"])
def chat():
    try:
        user_input = request.json.get("message")
        if not user_input:
            return jsonify({"error": "No message provided"}), 400

        logging.info(f"Received user input: {user_input}")

        messages = [ChatMessage(role="user", content=user_input)]
        response = spark.generate([messages])
        ai_reply = response.generations[0][0].message.content

        logging.info(f"Received AI reply: {ai_reply}")

        return jsonify({"reply": ai_reply})

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
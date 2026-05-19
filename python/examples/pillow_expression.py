from flask import Flask, request
from PIL import ImageMath

app = Flask(__name__)


@app.get("/pillow/expression")
def register_pillow_expression():
    expression = request.args.get("expression", "1 + 1")
    value = evaluate_expression(expression)

    return {"value": value}


def evaluate_expression(expression):
    return ImageMath.eval(expression)

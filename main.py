from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from quote_agent import QuoteAgent  # Your existing QuoteAgent class
from typing import Optional
import shutil

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the agent
agent = QuoteAgent()

# Create books directory if it doesn't exist
os.makedirs("books", exist_ok=True)

class GuessRequest(BaseModel):
    guess: str
    correct_book: str

@app.post("/upload-book")
async def upload_book(
    file: UploadFile = File(...),
    title: str = None,
    author: str = None,
    page_range_start: Optional[int] = None,
    page_range_end: Optional[int] = None
):
    try:
        # Save the uploaded PDF
        file_path = f"books/{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Add book to agent
        page_range = None
        if page_range_start and page_range_end:
            page_range = (page_range_start, page_range_end)
            
        agent.add_book(
            filepath=file_path,
            title=title or file.filename,
            author=author or "Unknown",
            page_range=page_range
        )
        
        return {"message": "Book added successfully"}
    except Exception as e:
        return {"error": str(e)}

@app.post("/get-quote")
async def get_quote():
    try:
        result = agent.get_random_quote()
        return {
            "quote": result["quote"],
            "page": result["page"],
            "book": result["correct_book"]["title"]
        }
    except Exception as e:
        return {"error": str(e)}

@app.post("/evaluate-guess")
async def evaluate_guess(request: GuessRequest):
    try:
        result = agent.evaluate_guess(request.guess, request.correct_book)
        return result
    except Exception as e:
        return {"error": str(e)}

@app.get("/show-page/{page_number}")
async def show_page(page_number: int, book_title: str):
    try:
        # Find the book by title
        book = next((b for b in agent.books if b["title"] == book_title), None)
        if not book:
            return {"error": "Book not found"}
            
        image_path = agent.show_page_image(book["filepath"], page_number)
        return {"image_path": image_path}
    except Exception as e:
        return {"error": str(e)} 
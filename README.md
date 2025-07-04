# Textgen: a random text generator powered by google gemini 🤖

## Fetures ⭐

- 🧾 Choose different types of generated text: paragraph, sentence, or word
- 🌎 Choose the language for the generated text
- 🔢 Select the number of items to generate for each type

## 🔑 How to Get and Use Your Google Gemini API Key

1. **Go to Google AI Studio:**  
   Visit [Google AI Studio](https://aistudio.google.com/app/apikey).

2. **Sign In:**  
   Log in with your Google account.

3. **Create an API Key:**

   - Click on "Create API Key" or the relevant button.
   - Follow the instructions to generate your API key.

4. **Copy Your API Key:**

   - After creation, copy the API key shown on the screen.
   - **Keep it safe!** Do not share your API key publicly.

5. **Add Your API Key to the App:**

   - Open the project folder.
   - Create a file named `.env` in the root directory (if it doesn't exist).
   - Add the following line to your `.env` file:
     ```
     VITE_APP_GEMINI_API_KEY=your_api_key_here
     ```
     Replace `your_api_key_here` with the API key you copied.

6. **Restart the App (if needed):**  
   If the app was running, restart it to load the new API key.

7. **Start Using the App:**  
   Now you can generate text using your own Gemini API key!

---

8. **Run the project**

```bash
# Development Mode
npm run dev

# Install Dependency
npm run dev

```

**Note:**

- Never share your API key with others or commit it to public repositories.
- If your key is compromised, revoke it from Google AI Studio and create a new one.

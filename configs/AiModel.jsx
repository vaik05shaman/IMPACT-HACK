const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
 
  export  const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level:Basic, Duration: 1 hours, NoOf Chapters:5, in JSON format \n24 \n0"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"Course Name\": \"Following Detail\",\n  \"Description\": \"This course is designed to help beginners understand and appreciate the importance of detail in programming, specifically within the Python language. We will cover key concepts and build a strong foundation for future development.\",\n  \"Category\": \"Programming\",\n  \"Topic\": \"Python\",\n  \"Level\": \"Basic\",\n  \"Duration\": \"1 hours\",\n  \"NoOf Chapters\": 5,\n  \"Chapters\": [\n    {\n      \"Chapter Name\": \"Introduction to Detail-Oriented Programming\",\n      \"About\": \"This chapter introduces the concept of detail-oriented programming and why it is crucial for writing robust and maintainable code. We will explore common pitfalls that arise from neglecting detail and learn techniques to avoid them.\",\n      \"Duration\": \"10 minutes\"\n    },\n    {\n      \"Chapter Name\": \"Python Syntax and Data Types: The Devil is in the Details\",\n      \"About\": \"We will delve into the specifics of Python syntax and data types, highlighting common mistakes and best practices.  Understanding the nuances of indentation, variable naming, and data type behavior is essential for accurate coding.\",\n      \"Duration\": \"15 minutes\"\n    },\n    {\n      \"Chapter Name\": \"Functions and Error Handling:  Paying Attention to the Small Things\",\n      \"About\": \"This chapter focuses on writing well-defined functions and implementing proper error handling. We will learn how to anticipate potential issues and write code that gracefully handles unexpected inputs or errors. We'll cover try-except blocks and best practices for documentation.\",\n      \"Duration\": \"15 minutes\"\n    },\n    {\n      \"Chapter Name\": \"Code Style and Documentation: Communicating Clearly\",\n      \"About\": \"Learn about the importance of consistent code style and thorough documentation. We'll explore PEP 8 guidelines and best practices for writing clear and understandable code, including using comments effectively.  We'll discuss tools like linters and auto-formatters.\",\n      \"Duration\": \"10 minutes\"\n    },\n    {\n      \"Chapter Name\": \"Practical Exercise: Building a Detail-Oriented Application\",\n      \"About\": \"We will apply the concepts learned throughout the course by building a small Python application. This hands-on experience will reinforce the importance of attention to detail and provide valuable practical skills.\",\n      \"Duration\": \"20 minutes\"\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
 
  
// White Rabbit AI Client - OpenAI Compatible

// Main function to create chat completion
export async function createChatCompletion({
  baseUrl,
  apiKey,
  model,
  temperature,
  systemPrompt,
  userPayload,
  signal,
  onStream = null
}) {
  if (!apiKey) {
    throw new Error('API key is required');
  }

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: JSON.stringify(userPayload) }
  ];

  const requestBody = {
    model: model || "gpt-4o-mini",
    messages: messages,
    temperature: temperature || 0.3,
    max_tokens: 2000,
    stream: !!onStream
  };

  const url = `${baseUrl}/chat/completions`;
  
  try {
    const response = await fetchWithRetry(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody),
      signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    if (onStream) {
      return handleStreamResponse(response, onStream);
    } else {
      const data = await response.json();
      return data.choices[0]?.message?.content || 'No response generated';
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request was cancelled');
    }
    throw error;
  }
}

// Handle streaming response
async function handleStreamResponse(response, onStream) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullContent = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          
          if (data === '[DONE]') {
            continue;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            
            if (content) {
              fullContent += content;
              onStream(content, fullContent);
            }
          } catch (e) {
            // Skip invalid JSON chunks
            console.warn('Failed to parse stream chunk:', e);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return fullContent;
}

// Fetch with retry logic for rate limits and server errors
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      // If rate limited or server error, retry with exponential backoff
      if (response.status === 429 || response.status >= 500) {
        if (attempt === maxRetries) {
          return response; // Let the caller handle the error
        }
        
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      return response;
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Utility to validate API configuration
export function validateConfig(config) {
  const errors = [];
  
  if (!config.apiKey) {
    errors.push('API key is required');
  }
  
  if (!config.baseUrl) {
    errors.push('Base URL is required');
  }
  
  if (!config.model) {
    errors.push('Model is required');
  }
  
  if (config.temperature < 0 || config.temperature > 1) {
    errors.push('Temperature must be between 0 and 1');
  }
  
  return errors;
}
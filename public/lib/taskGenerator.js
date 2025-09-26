// White Rabbit Task Generator - HTML to Interactive Tasks

// Extract main content from HTML
export function extractMainContent(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Remove unwanted elements
  const unwantedSelectors = [
    'nav', 'header', 'footer', 'aside', '.sidebar', '.navigation', '.menu',
    '.comments', '.comment', '.ad', '.advertisement', '.banner', '.popup',
    '.cookie', '.newsletter', '.social', '.share', '.related', '.recommended',
    'script', 'style', 'noscript', '.hidden', '[style*="display: none"]'
  ];
  
  unwantedSelectors.forEach(selector => {
    doc.querySelectorAll(selector).forEach(el => el.remove());
  });
  
  // Try to find main content container
  let mainContent = '';
  const contentSelectors = [
    'article',
    'main',
    '[role="main"]',
    '.content',
    '.post-content',
    '.entry-content',
    '.article-content',
    '#content',
    '#main-content'
  ];
  
  for (const selector of contentSelectors) {
    const element = doc.querySelector(selector);
    if (element && element.textContent.trim().length > 200) {
      mainContent = element.textContent.trim();
      break;
    }
  }
  
  // Fallback: get largest text block
  if (!mainContent) {
    const textElements = doc.querySelectorAll('p, div, section');
    let largestElement = null;
    let maxLength = 0;
    
    textElements.forEach(el => {
      const text = el.textContent.trim();
      if (text.length > maxLength && text.length > 100) {
        maxLength = text.length;
        largestElement = el;
      }
    });
    
    if (largestElement) {
      // Get parent context for better content
      const parent = largestElement.parentElement;
      mainContent = parent ? parent.textContent.trim() : largestElement.textContent.trim();
    }
  }
  
  // Clean up the text
  mainContent = mainContent
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim();
  
  return mainContent.length > 100 ? mainContent : null;
}

// Generate system prompt based on user profile
export function generateSystemPrompt(profile) {
  const { knowledgeLevel, skills, learningStyle } = profile;
  
  let prompt = `You are White Rabbit, an AI that converts web content into interactive step-by-step learning tasks. 

User Profile:
- Knowledge Level: ${knowledgeLevel}
- Skills Focus: ${skills.join(', ')}
- Learning Style: ${learningStyle}

Instructions:
1. Analyze the provided content and extract the main educational or instructional value
2. Create a step-by-step interactive task list that helps the user learn or apply the content
3. Adapt the complexity and language to the user's knowledge level:
   - Beginner: Detailed explanations, simple language, more preparatory steps
   - Intermediate: Balanced detail, assume some background knowledge
   - Advanced: Concise instructions, focus on key insights and advanced concepts

4. Consider the user's learning style:
   - Visual: Include descriptions of what to look for, visual cues
   - Audio: Suggest reading aloud, verbal explanations
   - Practical: Focus on hands-on actions, real-world applications

5. Return ONLY a JSON object with this exact structure:
{
  "title": "Task title",
  "description": "Brief description of what the user will accomplish",
  "estimatedTime": "X minutes",
  "steps": [
    {
      "id": 1,
      "title": "Step title",
      "description": "Detailed instruction",
      "type": "action|read|research|practice",
      "searchQuery": "optional search terms for external research",
      "externalLink": "optional helpful URL"
    }
  ],
  "resources": [
    {
      "title": "Resource name", 
      "url": "URL",
      "type": "article|video|tool|documentation"
    }
  ]
}

Make the task practical and actionable. Include 3-8 steps maximum.`;

  return prompt;
}

// Generate interactive task from content
export async function generateInteractiveTask(content, profile, aiClient) {
  const systemPrompt = generateSystemPrompt(profile);
  
  const userPrompt = `Convert this web content into an interactive learning task:

${content.substring(0, 3000)}${content.length > 3000 ? '...' : ''}`;

  try {
    const response = await aiClient.createChatCompletion({
      systemPrompt,
      userPayload: userPrompt,
      temperature: 0.3
    });
    
    // Parse the JSON response
    const taskData = JSON.parse(response.trim());
    
    // Validate the structure
    if (!taskData.title || !taskData.steps || !Array.isArray(taskData.steps)) {
      throw new Error('Invalid task structure returned from AI');
    }
    
    // Add IDs to steps if missing
    taskData.steps = taskData.steps.map((step, index) => ({
      ...step,
      id: step.id || index + 1,
      completed: false
    }));
    
    return taskData;
    
  } catch (error) {
    console.error('Failed to generate interactive task:', error);
    throw new Error('Failed to generate task. Please try again.');
  }
}

// Check if user has premium subscription
export function hasSubscription(subscriptionLevel) {
  return subscriptionLevel === 'premium';
}

// Create upgrade prompt for free users
export function createUpgradePrompt() {
  return {
    title: "🚀 Upgrade to Premium",
    description: "Interactive tasks are a Premium feature. Upgrade to unlock step-by-step learning from any webpage!",
    features: [
      "✅ Convert any webpage into interactive tasks",
      "✅ Personalized learning based on your profile",
      "✅ Audio generation (Podcast mode)",
      "✅ Advanced progress tracking",
      "✅ Priority AI processing"
    ],
    action: "Upgrade to Premium"
  };
}
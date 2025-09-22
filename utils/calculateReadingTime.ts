/**
 * Calculate estimated reading time for a given text content
 * Based on average reading speed of 200-250 words per minute
 */

interface ReadingTimeResult {
  minutes: number;
  words: number;
  text: string;
}

/**
 * Calculates reading time for given content
 * @param content - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 225 WPM)
 * @returns Object containing reading time in minutes, word count, and formatted text
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): ReadingTimeResult {
  if (!content || typeof content !== "string") {
    return {
      minutes: 0,
      words: 0,
      text: "0 min read",
    };
  }

  // Remove markdown syntax, HTML tags, and extra whitespace
  const cleanText = content
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`[^`]*`/g, "") // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[.*?\]\(.*?\)/g, "") // Remove links (keep text)
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/#{1,6}\s+/g, "") // Remove markdown headers
    .replace(/[*_~`]/g, "") // Remove markdown formatting
    .replace(/^\s*[-*+]\s+/gm, "") // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, "") // Remove numbered list markers
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  // Count words (split by whitespace and filter out empty strings)
  const words = cleanText.split(/\s+/).filter((word) => word.length > 0).length;

  // Calculate reading time
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  // Format the reading time text
  const text = minutes === 1 ? "~1 min read" : `~${minutes} min read`;

  return {
    minutes,
    words,
    text,
  };
}

/**
 * Get a more detailed reading time breakdown
 * @param content - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 225 WPM)
 * @returns Detailed reading time information
 */
export function getDetailedReadingTime(
  content: string,
  wordsPerMinute: number = 225
) {
  const result = calculateReadingTime(content, wordsPerMinute);

  return {
    ...result,
    estimatedSeconds: Math.ceil((result.words / wordsPerMinute) * 60),
    readingSpeed: wordsPerMinute,
    isLongForm: result.minutes > 10,
    isShortForm: result.minutes <= 3,
  };
}

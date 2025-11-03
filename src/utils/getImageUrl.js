function getImgUrl(imagePath) {
  // If it's already a full Cloudinary URL, return it as is
  if (imagePath && imagePath.startsWith("http")) {
    return imagePath;
  }

  // If it's a local file path, use the old logic
  if (imagePath && !imagePath.startsWith("http")) {
    try {
      return new URL(`../assets/books/${imagePath}`, import.meta.url).href;
    } catch (error) {
      console.error("Invalid image path:", imagePath);
      return "/placeholder-image.jpg";
    }
  }

  // Fallback for empty/null values
  return "/placeholder-image.jpg";
}

export { getImgUrl };

function getImgUrl(imagePath) {
  
  if (imagePath && imagePath.startsWith("http")) {
    return imagePath;
  }

  // Fallback for empty/null values
  return "/placeholder-image.jpg";
}

export { getImgUrl };

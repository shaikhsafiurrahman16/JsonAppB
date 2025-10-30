function normal(obj) {
  if (Array.isArray(obj)) return obj.map(normal);
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [
        k.toLowerCase(),
        normal(v),
      ])
    );
  }
  return obj;
}
module.exports = normal;
export const parseJsonFields = (body) => {
  if (!body) return body;
  if (typeof body.resumeData === "string") {
    try {
      const parsed = JSON.parse(body.resumeData);
      body = { ...body, ...parsed };
      delete body.resumeData;
    } catch (err) {
      console.warn("Invalid resumeData JSON");
    }
  }

  const jsonFields = ["personal_info", "sections"];
  jsonFields.forEach((key) => {
    if (typeof body[key] === "string") {
      try {
        body[key] = JSON.parse(body[key]);
      } catch {}
    }
  });
  return body;
};
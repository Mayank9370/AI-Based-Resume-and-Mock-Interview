// Helper function to render HTML descriptions safely
export const renderHTML = (content) => {
    if (!content) return null;

    // Handle array of strings (legacy format)
    if (Array.isArray(content)) {
        return content.join('<br>');
    }

    // Handle HTML or plain text
    return content;
};

// Component to render description HTML
export const DescriptionHTML = ({ content, className = "" }) => {
    if (!content) return null;

    const html = renderHTML(content);

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const formatDateForStorage = (
    dateValue: string | null
): string | null => {
    if (!dateValue) return null;

    try {
        // Parse the date and convert it to ISO format
        const date = new Date(dateValue);
        // Check if date is valid
        if (isNaN(date.getTime())) return null;

        // Return only the date part (YYYY-MM-DD)
        return date.toISOString().split("T")[0];
    } catch (error) {
        console.error("Error formatting date:", error);
        return null;
    }
};

// Display label based on type
export const getLabel = (type: string) => {
    switch (type) {
        case "reflection":
            return "Reflection";
        case "quote":
            return "Quote";
        case "memorable":
            return "Memorable";
        default:
            return "Content";
    }
};

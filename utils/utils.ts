export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
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

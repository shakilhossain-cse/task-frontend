const formateDate = (date: string): string => {
    const parsedDate = new Date(date);

    // Format the date to "long" format
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(parsedDate);

    return formattedDate;
}

export default formateDate
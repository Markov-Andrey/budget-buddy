export function formatDate(datetime, locale = navigator.language) {
    const date = new Date(datetime);

    if (!datetime || isNaN(date.getTime())) {
        return null;
    }

    return date.toLocaleDateString(locale, {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

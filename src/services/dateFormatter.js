// src/services/dateFormatter.js
export function formatDate(datetime, locale = navigator.language) {
    return new Date(datetime).toLocaleDateString(locale, {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

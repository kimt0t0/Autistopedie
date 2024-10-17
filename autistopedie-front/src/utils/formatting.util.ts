export const formatDateUtil = (date: Date | null): string | null => {
    if (!date) return null;

    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

export const formatImageUrlUtil = (filepath: string): string => {
    return filepath.replace(/\\/g, '/');
}

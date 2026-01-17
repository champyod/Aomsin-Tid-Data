export const getBasePath = () => {
    // Check if running on client side and if basePath is configured
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
        const repoName = 'Aomsin-Tid-Data'; 
        // Or cleaner: return window.location.pathname.split('/')[1] === repoName ? `/${repoName}` : '';
        // But hardcoding is safer if we know the repo.
        return `/${repoName}`;
    }
    return '';
};

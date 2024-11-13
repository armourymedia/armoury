/**
 * Handle Bunny Stream video embeds.
 * 
 * @since 1.0.0
 */
document.addEventListener('DOMContentLoaded', () => {
    const videoLinks = document.querySelectorAll('a[href*="iframe.mediadelivery.net/play"]');
    
    // Exit early if no video links found
    if (!videoLinks.length) return;

    /**
     * Create iframe element for video embed
     * 
     * @param {string} videoUrl The video URL to embed
     * @return {HTMLIFrameElement} The created iframe element
     */
    const createIframe = (videoUrl) => {
        const iframe = document.createElement('iframe');
        iframe.src = videoUrl.replace('/play/', '/embed/');
        iframe.allow = 'accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        return iframe;
    };

    /**
     * Handle video link click
     * 
     * @param {Event} e Click event
     */
    const handleClick = (e) => {
        e.preventDefault();
        
        const link = e.currentTarget;
        const wrapper = document.createElement('div');
        wrapper.className = 'armoury-video-wrapper';
        
        try {
            const iframe = createIframe(link.href);
            wrapper.appendChild(iframe);
            link.parentNode.replaceChild(wrapper, link);
        } catch (error) {
            console.error('Error embedding video:', error);
        }
    };

    // Add click handlers to all video links
    videoLinks.forEach(link => {
        link.addEventListener('click', handleClick);
    });
});
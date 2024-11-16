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
     * @param {string} videoTitle The video title for accessibility
     * @return {HTMLIFrameElement} The created iframe element
     */
    const createIframe = (videoUrl, videoTitle) => {
        const iframe = document.createElement('iframe');
        iframe.src = videoUrl.replace('/play/', '/embed/');
        iframe.allow = 'accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        iframe.title = videoTitle; // Add title for accessibility
        iframe.setAttribute('aria-label', videoTitle); // Add ARIA label
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
        const videoTitle = link.getAttribute('aria-label') || 'Video player';
        
        const wrapper = document.createElement('div');
        wrapper.className = 'armoury-video-wrapper';
        wrapper.setAttribute('role', 'region');
        wrapper.setAttribute('aria-label', videoTitle);
        
        try {
            const iframe = createIframe(link.href, videoTitle);
            wrapper.appendChild(iframe);
            link.parentNode.replaceChild(wrapper, link);
        } catch (error) {
            console.error('Error embedding video:', error);
        }
    };

    // Add click handlers and accessibility attributes to all video links
    videoLinks.forEach(link => {
        const imageAlt = link.querySelector('img')?.alt || '';
        const videoTitle = `Video: ${imageAlt || 'Play video'}`;
        
        link.setAttribute('role', 'button');
        link.setAttribute('aria-label', videoTitle);
        
        link.addEventListener('click', handleClick);
    });
});

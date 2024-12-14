/**
 * Handle Bunny Stream video and Transistor podcast embeds.
 *
 * @since 1.0.0
 */
document.addEventListener('DOMContentLoaded', () => {
    const videoLinks = document.querySelectorAll('a[href*="iframe.mediadelivery.net/play"]');
    const podcastLinks = document.querySelectorAll('a[href*="share.transistor.fm/s/"]');
    
    // Exit early if no media links found
    if (!videoLinks.length && !podcastLinks.length) return;

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
        iframe.setAttribute('importance', 'high');
        iframe.loading = 'eager';
        iframe.title = videoTitle;
        iframe.setAttribute('aria-label', videoTitle);
        return iframe;
    };

    /**
     * Create iframe element for podcast embed
     *
     * @param {string} episodeId The Transistor episode ID
     * @param {string} episodeTitle The episode title for accessibility
     * @return {HTMLIFrameElement} The created iframe element
     */
    const createPodcastIframe = (episodeId, episodeTitle) => {
        const iframe = document.createElement('iframe');
        iframe.src = `https://share.transistor.fm/e/${episodeId}`;
        iframe.allow = 'encrypted-media';
        iframe.loading = 'lazy';
        iframe.title = episodeTitle;
        iframe.setAttribute('aria-label', episodeTitle);
        iframe.width = '100%';
        iframe.height = '180';
        iframe.style.border = 'none';
        return iframe;
    };

    /**
     * Handle video link click
     *
     * @param {Event} e Click event
     */
    const handleVideoClick = (e) => {
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

    /**
     * Handle podcast link click
     *
     * @param {Event} e Click event
     */
    const handlePodcastClick = (e) => {
        e.preventDefault();
        
        const link = e.currentTarget;
        let episodeId = '';
        
        // Safely extract episode ID from URL
        try {
            const urlParts = link.href.split('/s/');
            if (urlParts.length === 2) {
                episodeId = urlParts[1].replace(/\/?(?:\?.*)?$/, '');
            }
        } catch (error) {
            console.error('Error parsing podcast URL:', error);
            return;
        }
        
        if (!episodeId) {
            console.error('Invalid podcast URL format');
            return;
        }

        // Use the link text as the title, fallback to generic if empty
        const episodeTitle = link.textContent.trim() || 'Listen to podcast episode';
        
        const wrapper = document.createElement('div');
        wrapper.className = 'armoury-podcast-wrapper';
        wrapper.setAttribute('role', 'region');
        wrapper.setAttribute('aria-label', episodeTitle);
        
        try {
            const iframe = createPodcastIframe(episodeId, episodeTitle);
            wrapper.appendChild(iframe);
            link.parentNode.replaceChild(wrapper, link);
        } catch (error) {
            console.error('Error embedding podcast:', error);
        }
    };

    // Add click handlers and accessibility attributes to all video links
    videoLinks.forEach(link => {
        const imageAlt = link.querySelector('img')?.alt || '';
        const videoTitle = `Video: ${imageAlt || 'Play video'}`;
        
        link.setAttribute('role', 'button');
        link.setAttribute('aria-label', videoTitle);
        
        link.addEventListener('click', handleVideoClick);
    });

    // Add click handlers and accessibility attributes to all podcast links
    podcastLinks.forEach(link => {
        const title = link.textContent.trim() || 'Listen to podcast episode';
        
        link.setAttribute('role', 'button');
        link.setAttribute('aria-label', title);
        
        link.addEventListener('click', handlePodcastClick);
    });
});

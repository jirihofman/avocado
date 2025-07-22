/**
 * Audio cache utility to solve Safari MP3 caching issues
 * Preloads and caches audio files in memory for faster playback
 */

class AudioCache {
    constructor() {
        this.cache = new Map();
        this.loadingPromises = new Map();
    }

    /**
     * Preloads an audio file and caches it
     * @param {string} url - The audio file URL
     * @returns {Promise<HTMLAudioElement>} - Promise that resolves to cached audio element
     */
    async preloadAudio(url) {
        // Return cached audio if already loaded
        if (this.cache.has(url)) {
            return this.cache.get(url);
        }

        // Return existing loading promise if already loading
        if (this.loadingPromises.has(url)) {
            return this.loadingPromises.get(url);
        }

        // Create loading promise
        const loadingPromise = new Promise((resolve, reject) => {
            const audio = new Audio();
            
            audio.preload = 'auto';
            
            const onLoad = () => {
                audio.removeEventListener('canplaythrough', onLoad);
                audio.removeEventListener('error', onError);
                this.cache.set(url, audio);
                this.loadingPromises.delete(url);
                resolve(audio);
            };

            const onError = () => {
                audio.removeEventListener('canplaythrough', onLoad);
                audio.removeEventListener('error', onError);
                this.loadingPromises.delete(url);
                reject(new Error(`Failed to load audio: ${url}`));
            };

            audio.addEventListener('canplaythrough', onLoad);
            audio.addEventListener('error', onError);
            
            audio.src = url;
        });

        this.loadingPromises.set(url, loadingPromise);
        return loadingPromise;
    }

    /**
     * Gets a cached audio element, cloning it for playback
     * @param {string} url - The audio file URL
     * @returns {HTMLAudioElement|null} - Cloned audio element or null if not cached
     */
    getCachedAudio(url) {
        const cachedAudio = this.cache.get(url);
        if (!cachedAudio) {
            return null;
        }

        // Clone the audio element to allow multiple simultaneous playbacks
        const audio = cachedAudio.cloneNode();
        audio.currentTime = 0; // Reset to beginning
        return audio;
    }

    /**
     * Preloads multiple audio files
     * @param {string[]} urls - Array of audio file URLs
     * @returns {Promise<HTMLAudioElement[]>} - Promise that resolves when all audio files are loaded
     */
    async preloadMultiple(urls) {
        const promises = urls.map(url => this.preloadAudio(url));
        return Promise.all(promises);
    }

    /**
     * Clears the cache
     */
    clear() {
        this.cache.clear();
        this.loadingPromises.clear();
    }

    /**
     * Gets cache statistics
     * @returns {object} - Cache statistics
     */
    getStats() {
        return {
            cached: this.cache.size,
            loading: this.loadingPromises.size
        };
    }
}

// Export singleton instance
export const audioCache = new AudioCache();
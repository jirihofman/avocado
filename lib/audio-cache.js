/**
 * Audio cache utility to solve Safari MP3 caching issues using IndexedDB
 * Fetches audio files as blobs and stores them in IndexedDB for persistent caching
 */

class AudioCache {
    constructor() {
        this.memoryCache = new Map(); // For object URLs
        this.loadingPromises = new Map();
        this.dbName = 'AudioCacheDB';
        this.dbVersion = 1;
        this.storeName = 'audioFiles';
        this.db = null;
    }

    /**
     * Initialize IndexedDB
     * @returns {Promise<IDBDatabase>}
     */
    async initDB() {
        if (this.db) {
            return this.db;
        }

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => reject(request.error);
            
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, { keyPath: 'url' });
                    store.createIndex('url', 'url', { unique: true });
                }
            };
        });
    }

    /**
     * Store audio blob in IndexedDB
     * @param {string} url - The audio file URL
     * @param {Blob} blob - The audio blob data
     */
    async storeBlobInDB(url, blob) {
        const db = await this.initDB();
        
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            
            const data = {
                url,
                blob,
                timestamp: Date.now()
            };

            const request = store.put(data);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Retrieve audio blob from IndexedDB
     * @param {string} url - The audio file URL
     * @returns {Promise<Blob|null>}
     */
    async getBlobFromDB(url) {
        try {
            const db = await this.initDB();
            
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readonly');
                const store = transaction.objectStore(this.storeName);
                
                const request = store.get(url);
                request.onsuccess = () => {
                    const result = request.result;
                    resolve(result ? result.blob : null);
                };
                request.onerror = () => reject(request.error);
            });
        } catch (error) {
            console.warn('IndexedDB access failed, falling back:', error);
            return null;
        }
    }

    /**
     * Preloads an audio file and caches it in IndexedDB
     * @param {string} url - The audio file URL
     * @returns {Promise<HTMLAudioElement>} - Promise that resolves to cached audio element
     */
    async preloadAudio(url) {
        // Return cached audio if already loaded in memory
        if (this.memoryCache.has(url)) {
            const objectUrl = this.memoryCache.get(url);
            const audio = new Audio(objectUrl);
            return audio;
        }

        // Return existing loading promise if already loading
        if (this.loadingPromises.has(url)) {
            return this.loadingPromises.get(url);
        }

        // Create loading promise
        const loadingPromise = this.loadAndCacheAudio(url);
        this.loadingPromises.set(url, loadingPromise);
        
        try {
            const audio = await loadingPromise;
            this.loadingPromises.delete(url);
            return audio;
        } catch (error) {
            this.loadingPromises.delete(url);
            throw error;
        }
    }

    /**
     * Load audio from IndexedDB or fetch from network
     * @param {string} url - The audio file URL
     * @returns {Promise<HTMLAudioElement>}
     */
    async loadAndCacheAudio(url) {
        try {
            // Try to get from IndexedDB first
            let blob = await this.getBlobFromDB(url);
            
            if (!blob) {
                // Fetch from network if not in IndexedDB
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch audio: ${response.status}`);
                }
                
                blob = await response.blob();
                
                // Store in IndexedDB for future use
                try {
                    await this.storeBlobInDB(url, blob);
                } catch (dbError) {
                    console.warn('Failed to store audio in IndexedDB:', dbError);
                    // Continue anyway - we have the blob
                }
            }

            // Create object URL and store in memory cache
            const objectUrl = URL.createObjectURL(blob);
            this.memoryCache.set(url, objectUrl);

            // Create audio element
            const audio = new Audio();
            audio.preload = 'auto';

            return new Promise((resolve, reject) => {
                const onLoad = () => {
                    audio.removeEventListener('canplaythrough', onLoad);
                    audio.removeEventListener('error', onError);
                    resolve(audio);
                };

                const onError = () => {
                    audio.removeEventListener('canplaythrough', onLoad);
                    audio.removeEventListener('error', onError);
                    // Clean up object URL on error
                    URL.revokeObjectURL(objectUrl);
                    this.memoryCache.delete(url);
                    reject(new Error(`Failed to load audio: ${url}`));
                };

                audio.addEventListener('canplaythrough', onLoad);
                audio.addEventListener('error', onError);
                
                audio.src = objectUrl;
            });

        } catch (error) {
            throw new Error(`Failed to preload audio ${url}: ${error.message}`);
        }
    }

    /**
     * Gets a cached audio element, cloning it for playback
     * @param {string} url - The audio file URL
     * @returns {HTMLAudioElement|null} - New audio element with cached source or null if not cached
     */
    getCachedAudio(url) {
        const objectUrl = this.memoryCache.get(url);
        if (!objectUrl) {
            return null;
        }

        // Create new audio element with cached object URL
        const audio = new Audio(objectUrl);
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
        // Clean up object URLs to prevent memory leaks
        for (const objectUrl of this.memoryCache.values()) {
            URL.revokeObjectURL(objectUrl);
        }
        
        this.memoryCache.clear();
        this.loadingPromises.clear();
    }

    /**
     * Clear IndexedDB storage
     */
    async clearDB() {
        try {
            const db = await this.initDB();
            const transaction = db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            store.clear();
        } catch (error) {
            console.warn('Failed to clear IndexedDB:', error);
        }
    }

    /**
     * Gets cache statistics
     * @returns {object} - Cache statistics
     */
    getStats() {
        return {
            cached: this.memoryCache.size,
            loading: this.loadingPromises.size
        };
    }
}

// Export singleton instance
export const audioCache = new AudioCache();
/**
 * Simple test for audio cache functionality
 * This is a minimal test to verify the cache works correctly
 */

import { audioCache } from './audio-cache.js';

// Mock Audio constructor for testing
global.Audio = class MockAudio {
    constructor() {
        this.src = '';
        this.preload = '';
        this.controls = false;
        this.autoPlay = false;
        this.currentTime = 0;
        this.listeners = {};
    }

    addEventListener(event, listener) {
        this.listeners[event] = listener;
    }

    removeEventListener(event, listener) {
        delete this.listeners[event];
    }

    cloneNode() {
        const clone = new MockAudio();
        clone.src = this.src;
        clone.preload = this.preload;
        return clone;
    }

    // Simulate successful load
    triggerLoad() {
        if (this.listeners.canplaythrough) {
            this.listeners.canplaythrough();
        }
    }

    // Simulate error
    triggerError() {
        if (this.listeners.error) {
            this.listeners.error();
        }
    }
};

// Test cases
export function runAudioCacheTests() {
    console.log('Running audio cache tests...');

    // Test 1: Cache initialization
    const stats = audioCache.getStats();
    if (stats.cached !== 0 || stats.loading !== 0) {
        throw new Error('Cache should be empty initially');
    }
    console.log('✓ Cache initialization test passed');

    // Test 2: Preload audio
    const testUrl = 'test://example.com/audio.mp3';
    const promise = audioCache.preloadAudio(testUrl);
    
    // Verify loading state
    const loadingStats = audioCache.getStats();
    if (loadingStats.loading !== 1) {
        throw new Error('Should have 1 loading audio');
    }
    console.log('✓ Preload initiation test passed');

    // Test 3: Get cached audio before loading completes
    const cachedBeforeLoad = audioCache.getCachedAudio(testUrl);
    if (cachedBeforeLoad !== null) {
        throw new Error('Should return null for audio not yet cached');
    }
    console.log('✓ Get cached before load test passed');

    console.log('All audio cache tests passed!');
}

// Only run tests if this file is executed directly (not imported)
if (typeof window === 'undefined' && typeof process !== 'undefined') {
    try {
        runAudioCacheTests();
    } catch (error) {
        console.error('Audio cache tests failed:', error);
        process.exit(1);
    }
}
import _ from 'lodash';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'react-bootstrap-icons';

export function karakQuestions({ demoId, subject }) {

    let emojiDelay = 0, options = [], pretext, solution, solutionDisplay, steps = [], tags = [], text, textComponent, textComponentProps, timeDisplayed, timeCompleted;

    // DEMO questions
    if (demoId) {
        switch (demoId) {

            case 'dice-karak-1': {
                const min = 1, max = 5;
                const dice1 = _.random(min, max);
                const dice2 = _.random(min, max - dice1 + 1);
                const weapon1 = _.random(0, 3);
                const weapon2 = _.random(0, 3);
                const numberOfScrolls = _.random(1, 3);

                // Max allowed value for solution is 6 (one dice roll).
                solution = dice1 + dice2 + weapon1 + weapon2 + numberOfScrolls;
                solutionDisplay = solution;

                options = [{ id: 1, value: solution, displayValue: solution }];

                // Incorrect answer between 1 and 19, excluding solution
                const option2 = genAnswerValue(1, 19, options.map(option => option.value));
                options.push({ id: 2, value: option2, displayValue: option2 });
                const option3 = genAnswerValue(1, 19, options.map(option => option.value));
                options.push({ id: 3, value: option3, displayValue: option3 });

                options = options.sort((a, b) => a.value - b.value);

                // text center alligned vertically
                text = <div className='d-flex justify-content-center align-items-center'>
                    <div>{numberToDice(dice1)}</div>
                    <div>{numberToDice(dice2)}</div>
                    <div className='mb-6 ms-2' style={{ width: '64px' }}>{numberToWeapon(weapon1)}</div>
                    <div className='mb-6' style={{ width: '64px' }}>{numberToWeapon(weapon2)}</div>
                    {numberToScrolls(numberOfScrolls)}
                </div>;

                tags = ['sčítání', 'karak', 'kostky', 'tři možnosti'];

                break;
            }
        }
    }

    return {
        clickCount: 0,
        /** Number of steps in multistep question. For single step questions it is 0. */
        currentStep: 0,
        emojiDelay,
        text, pretext,
        /** React component instead of text */
        textComponent,
        /** Props for textComponent */
        textComponentProps,
        solution,
        /** Graphical representation of solution, eg. icon of a dice */
        solutionDisplay,
        state: 'new',
        steps,
        subject,
        tags,
        timeDisplayed, timeCompleted,
        options
    };
}

const genAnswerValue = (min, max, excludedValues = []) => {
    let rand = null;  //an integer
    let i = 0;
    while (rand === null || excludedValues.includes(rand) || rand < 1) {
        rand = _.random(min, max);
        i++;
        if (i > 1000) throw new Error('Cannot generate random answer');
    }

    return rand;
};

const numberToDice = (number, iconSize) => {
    const size = iconSize || 64;
    switch (number) {
        case 1: return <Dice1 size={size} />;
        case 2: return <Dice2 size={size} />;
        case 3: return <Dice3 size={size} />;
        case 4: return <Dice4 size={size} />;
        case 5: return <Dice5 size={size} />;
        case 6: return <Dice6 size={size} />;
        default: return null;
    }
};

// Icons from: https://game-icons.net/1x1/lorc/daggers.html
const numberToWeapon = (number, iconSize) => {
    const size = iconSize || 64;
    let icon;
    switch (number) {
        case 1: {
            icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <rect fill="#ffffff" fillOpacity="1" height="512" width="512" rx="32" ry="32"></rect>
                <g transform="translate(0,0)" >
                    <g transform="translate(0, 512) scale(1, -1) rotate(0, 256, 256) skewX(0) skewY(0)">
                        <path
                            d="M65.03 33.376C48.885 33.39 33.452 38.966 20.937 49.719L24.625 63.469L81.405 48.249L77.75 34.593C73.488 33.858 69.245 33.37 65.03 33.373Z"
                            fill="#000000" fillOpacity="1"></path>
                        <path
                            d="M446.75 33.376C442.54 33.371 438.29 33.86 434.03 34.594L430.375 48.25L487.155 63.47L490.845 49.72C478.325 38.955 462.905 33.39 446.75 33.375Z"
                            fill="#000000" fillOpacity="1"></path>
                        <path
                            d="M71.97 68.406L42.812 76.22L69 173.905C68.928 174.437 68.882 174.967 68.812 175.499L99.938 167.124C99.182 166.139 98.421 165.161 97.656 164.186L71.97 68.407Z"
                            fill="#000000" fillOpacity="1"></path>
                        <path
                            d="M439.78 68.406L414.125 164.186C413.355 165.169 412.605 166.164 411.845 167.156L442.937 175.469C442.87 174.957 442.819 174.449 442.75 173.937L468.938 76.217L439.781 68.405Z"
                            fill="#000000" fillOpacity="1"></path>
                        <path
                            d="M114.187 182.688L63.407 196.281C59.947 211.069 47.947 223.539 32 231.281L34.813 241.813C46.913 236.733 59.151 232.123 71.531 228.001C72.714 216.561 80.807 206.385 92.501 203.251C94.389 202.745 96.271 202.454 98.157 202.345C107.893 201.782 117.244 206.335 122.907 214.065C135.677 211.38 148.597 209.225 161.687 207.689L158.907 197.251C141.221 198.521 124.58 193.767 114.187 182.688Z"
                            fill="#000000" fillOpacity="1"></path>
                        <path
                            d="M397.562 182.688C387.177 193.76 370.549 198.513 352.875 197.25L350.062 207.688C363.157 209.225 376.069 211.378 388.844 214.063C394.507 206.335 403.858 201.781 413.594 202.343C415.479 202.453 417.394 202.743 419.281 203.25C430.977 206.384 439.071 216.56 440.251 228C452.635 232.122 464.867 236.73 476.971 241.813L479.781 231.281C463.837 223.539 451.835 211.069 448.376 196.281L397.563 182.688Z"
                            fill="#000000" fillOpacity="1"></path>
                        <path
                            d="M100.312 220.938C99.99 220.926 99.672 220.946 99.344 220.968C98.684 221.015 98.012 221.133 97.344 221.313C91.994 222.746 88.941 227.993 90.374 233.343C91.808 238.693 97.056 241.715 102.406 240.281C107.756 238.849 110.808 233.599 109.376 228.251C108.3 224.241 105.083 221.531 101.281 221.031C100.965 220.991 100.636 220.951 100.313 220.938Z"
                            fill="#000000" fillOpacity="1"></path>
                        <path
                            d="M411.469 220.968C411.144 220.978 410.816 220.99 410.499 221.031C406.697 221.531 403.479 224.241 402.405 228.251C400.972 233.599 403.992 238.849 409.343 240.281C414.693 241.716 419.941 238.693 421.373 233.345C422.808 227.995 419.787 222.747 414.436 221.315C413.433 221.045 412.44 220.941 411.468 220.97Z"
                            fill="#000000" fillOpacity="1"></path>
                        <path
                            d="M138.499 229.968C135.099 230.583 131.721 231.248 128.343 231.938C127.953 240.928 123.273 249.304 115.873 254.375L157.813 410.938L139.78 415.781L97.812 259.221C88.919 258.539 80.718 253.675 75.875 246.157C72.623 247.245 69.387 248.367 66.155 249.532C71.555 337.736 107.568 421.469 170.375 493.282C191.645 409.932 178.147 311.455 138.5 229.972Z"
                            fill="#000000" fillOpacity="1"></path>
                        <path
                            d="M373.279 229.968C333.622 311.454 320.102 409.928 341.374 493.281C404.184 421.466 440.164 337.737 445.562 249.531C442.342 248.371 439.112 247.245 435.874 246.157C431.028 253.66 422.854 258.533 413.968 259.22L372 415.78L353.937 410.938L395.907 254.375C388.495 249.305 383.797 240.937 383.407 231.937C380.037 231.249 376.673 230.582 373.281 229.969Z"
                            fill="#000000" fillOpacity="1"></path>
                    </g>
                </g>
                <g transform="translate(256,256)" >
                    <g transform="translate(6.4, 6.4) scale(0.8, 0.8) rotate(0, 128, 128)">
                        <circle cx="128" cy="128" r="128" fill="#9b9b9b" fillOpacity="1"></circle>
                        <circle stroke="#fff" strokeOpacity="1" fill="#9b9b9b" fillOpacity="1"
                            strokeWidth="18" cx="128" cy="128" r="101"></circle>
                        <path fill="#fff" fillOpacity="1"
                            d="M84.18 168.7H113V86.99l-29.58 6.1V70.91l29.38-6.09h31V168.7h28.8v22.5H84.18z"></path>
                    </g>
                </g>
            </svg>;

            break;
        }
        case 2: {
            icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <rect fill="#ffffff" fillOpacity="1" height="512" width="512" rx="32" ry="32"></rect>
                <g transform="translate(0,0)">
                    <path
                        d="M40.598 20.316c-11.602 0-21.008 9.406-21.008 21.008 0 11.602 9.406 21.006 21.008 21.006 1.788 0 3.524-.226 5.18-.646l54.972 54.97-46.223 46.223 46.924 65.783 15.216-10.85-28.316-39.7 18.29-18.29 186.083 272.387 2.203 1.084c53.664 26.42 111.6 49.15 183.537 58.05l11.496 1.424-1.044-11.54c-6.375-70.503-30.856-128.572-58.082-183.845l-1.088-2.21L157.08 109.38l18.432-18.433 39.586 28.395 10.892-15.186-65.652-47.09-46.373 46.373-53.992-53.993c1.05-2.5 1.63-5.242 1.63-8.123 0-11.602-9.404-21.008-21.005-21.008zM143.63 122.828l271.49 184.988c.395.807.78 1.617 1.175 2.424l-9.844 28.38-259.538-191.436L338.066 406.8l-33.15 10.13-184.83-270.557 23.545-23.545zm127.327 147.45L418.13 379.3l11.85-49.017 37.204 135.32-135.317-37.205 49.014-11.856-109.923-146.26z"
                        fill="#000000" fillOpacity="1"
                        transform="translate(0, 512) scale(1, -1) rotate(0, 256, 256) skewX(0) skewY(0)"></path>
                </g>
                <g transform="translate(256,256)">
                    <g transform="translate(6.4, 6.4) scale(0.8, 0.8) rotate(0, 128, 128)">
                        <circle cx="128" cy="128" r="128" fill="#9b9b9b" fillOpacity="1"></circle>
                        <circle stroke="#fff" strokeOpacity="1" fill="#9b9b9b" fillOpacity="1"
                            strokeWidth="18" cx="128" cy="128" r="101"></circle>
                        <path fill="#fff" fillOpacity="1"
                            d="M118.3 168.3h55.6v24H82.08v-24l46.12-40.7q6.2-5.5 9.1-10.9 3-5.3 3-11.1 0-8.85-6-14.27-5.9-5.42-15.8-5.42-7.6 0-16.7 3.3-9.06 3.22-19.38 9.65V71.1q11-3.64 21.78-5.5 10.7-1.95 21-1.95 22.7 0 35.3 9.99 12.6 9.99 12.6 27.86 0 10.3-5.4 19.3-5.3 8.9-22.4 23.9z"></path>
                    </g>
                </g>
            </svg>;

            break;
        }
        case 3: {
            icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <rect fill="#ffffff" fillOpacity="1" height="512" width="512" rx="32" ry="32"></rect>
                <g transform="translate(0,0)">
                    <path d="M240.094 19.594c-56.69.364-110.882 29.054-151.594 72.344-53.428 56.81-81.948 137.907-61.03 210.093 16.33-8.797 32.757-15.987 48.936-21.374-6.327-123.16 89.247-210.922 200.03-210.344 4.255-13.365 10.268-27.308 18.127-41.874-16.323-5.43-32.736-8.36-48.97-8.782-1.833-.047-3.67-.074-5.5-.062zM271.28 88.97C173.724 90.715 91.367 166.07 94.907 275.28c10.986-2.73 21.788-4.582 32.28-5.436 14.59-1.187 28.69-.463 41.783 2.437L278.312 162.94c-5.26-12.1-8.473-25.024-9.344-38.75-.716-11.256.14-22.983 2.592-35.22-.093.002-.187 0-.28 0zm60.845 60.718l-16.875 16.875L345.75 197l16.813-16.813-30.438-30.5zm-37.125 23L175.625 292.063l44.625 44.562 119.313-119.313L295 172.688zm189.875 46.093c-14.466 7.808-28.318 13.807-41.594 18.064.75 111.013-87.243 206.8-210.686 200.28-5.39 16.104-12.552 32.462-21.313 48.72 72.19 20.922 153.313-7.6 210.126-61.03 57.045-53.65 88.516-130.72 63.47-206.033zm-136 15.657L240.687 342.625c3.23 13.563 4.086 28.245 2.844 43.47-.862 10.58-2.752 21.476-5.53 32.56 109.585 3.718 185.128-79.008 186.594-176.905-12.342 2.506-24.16 3.403-35.5 2.688-14.287-.9-27.698-4.347-40.22-10zM169.5 312.313L20.094 461.72V494H48.75l151.188-151.188-30.438-30.5z" fill="#000000" fillOpacity="1">    
                    </path>
                </g>
                <g transform="translate(256,256)" >
                    <g transform="translate(6.4, 6.4) scale(0.8, 0.8) rotate(0, 128, 128)">
                        <circle cx="128" cy="128" r="128" fill="#9b9b9b" fillOpacity="1">
                        </circle>
                        <circle stroke="#fff" strokeOpacity="1" fill="#9b9b9b" fillOpacity="1" strokeWidth="18" cx="128" cy="128" r="101"></circle>
                        <path fill="#fff" fillOpacity="1" d="M149.5 123q12.8 3.3 19.4 11.5 6.7 8.1 6.7 20.7 0 18.8-14.4 28.6t-42 9.8q-9.7 0-19.51-1.7-9.73-1.5-19.29-4.6v-25.1q9.14 4.5 18.11 6.9 9.09 2.3 17.79 2.3 12.9 0 19.8-4.5T143 154q0-8.6-7.1-13-7-4.5-20.8-4.5h-13v-21h13.7q12.2 0 18.3-3.8 6-3.9 6-11.75 0-7.28-5.9-11.26-5.8-3.98-16.5-3.98-7.9 0-15.9 1.78-8.03 1.78-15.99 5.25V67.87q9.65-2.71 19.09-4.06 9.5-1.36 18.7-1.36 24.6 0 36.8 8.13 12.2 8.04 12.2 24.29 0 11.13-5.8 18.23-5.8 7-17.3 9.9z">
                        </path>
                    </g>
                </g>
            </svg>;
            break;
        }
        
        default: return null;

    }

    return <div style={{ width: `${size}px`, height: `${size}px` }}>{icon}</div>;
};

function numberToScrolls(number, iconSize) {
    
    const size = iconSize || 64;
    if (number > 0) {
        // Show scrolls as many times as the number
        return Array(3).fill().map((_, i) => {

            const showClass = i < number ? 'block' : 'none';
        
            return <div className='mb-6' style={{ width: `${size}px`, height: `${size}px` }} key={i}>
                <span className='scrolls'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ display: showClass }}>
                        <rect fill="#ffffff" fillOpacity="1" height="512" width="512" rx="32" ry="32"></rect>
                        <g transform="translate(0,0)">
                            <path
                                d="M103.432 17.844c-1.118.005-2.234.032-3.348.08-2.547.11-5.083.334-7.604.678-20.167 2.747-39.158 13.667-52.324 33.67-24.613 37.4 2.194 98.025 56.625 98.025.536 0 1.058-.012 1.583-.022v.704h60.565c-10.758 31.994-30.298 66.596-52.448 101.43-2.162 3.4-4.254 6.878-6.29 10.406l34.878 35.733-56.263 9.423c-32.728 85.966-27.42 182.074 48.277 182.074v-.002l9.31.066c23.83-.57 46.732-4.298 61.325-12.887 4.174-2.458 7.63-5.237 10.467-8.42h-32.446c-20.33 5.95-40.8-6.94-47.396-25.922-8.956-25.77 7.52-52.36 31.867-60.452 5.803-1.93 11.723-2.834 17.565-2.834v-.406h178.33c-.57-44.403 16.35-90.125 49.184-126 23.955-26.176 42.03-60.624 51.3-94.846l-41.225-24.932 38.272-6.906-43.37-25.807h-.005l.002-.002.002.002 52.127-8.85c-5.232-39.134-28.84-68.113-77.37-68.113C341.14 32.26 222.11 35.29 149.34 28.496c-14.888-6.763-30.547-10.723-45.908-10.652zm.464 18.703c13.137.043 27.407 3.804 41.247 10.63l.033-.07c4.667 4.735 8.542 9.737 11.68 14.985H82.92l10.574 14.78c10.608 14.83 19.803 31.99 21.09 42.024.643 5.017-.11 7.167-1.814 8.836-1.705 1.67-6.228 3.875-15.99 3.875-40.587 0-56.878-44.952-41.012-69.06C66.238 46.64 79.582 39.22 95.002 37.12c2.89-.395 5.863-.583 8.894-.573zM118.5 80.78h46.28c4.275 15.734 3.656 33.07-.544 51.51H131.52c1.9-5.027 2.268-10.574 1.6-15.77-1.527-11.913-7.405-24.065-14.62-35.74zm101.553 317.095c6.44 6.84 11.192 15.31 13.37 24.914 3.797 16.736 3.092 31.208-1.767 43.204-4.526 11.175-12.576 19.79-22.29 26h237.19c14.448 0 24.887-5.678 32.2-14.318 7.312-8.64 11.2-20.514 10.705-32.352-.186-4.473-.978-8.913-2.407-13.18l-69.91-8.205 42.017-20.528c-8.32-3.442-18.64-5.537-31.375-5.537H220.053zm-42.668.506c-1.152-.003-2.306.048-3.457.153-2.633.242-5.256.775-7.824 1.63-15.11 5.02-25.338 21.54-20.11 36.583 3.673 10.57 15.347 17.71 25.654 13.938l1.555-.57h43.354c.946-6.36.754-13.882-1.358-23.192-3.71-16.358-20.543-28.483-37.815-28.54z"
                                fill="#000000" fillOpacity="1"></path>
                        </g>
                    </svg>
                </span></div>;
        });
    }
}

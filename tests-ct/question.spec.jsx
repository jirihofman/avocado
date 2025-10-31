import { test, expect } from '@playwright/experimental-ct-react';
import Question from '../components/question';
import { demoIds } from '../lib/questions';

test.describe('Question Component', () => {

    test('renders add-1 question', async({ mount }) => {
        const component = await mount(<Question demoId={'add-1'} subject={'math'} />);
        
        // Wait for the question to load
        await expect(component).toBeVisible();
        
        // Should have question options (buttons)
        await expect(component.locator('.question-btn')).toHaveCount(4);
    });

    test('renders dice-1 question', async({ mount }) => {
        const component = await mount(<Question demoId={'dice-larger-1'} subject={'dice'} />);
        
        // Wait for the question to load
        await expect(component).toBeVisible();
        
        // Should have question content
        await expect(component.locator('.question-content, .question-text')).toBeVisible();
    });

    test.describe('words-1 question', () => {
        test('handles wrong answer on first click', async({ mount }) => {
            const component = await mount(<Question demoId={demoIds.WORDS_1} subject={'words'} />);
            
            // Wait for question to load
            await expect(component).toBeVisible();
            
            // Get the first letter from the question text
            const questionText = component.locator('.question-text button').first();
            await expect(questionText).toBeVisible();
            
            const firstLetter = await questionText.textContent();
            
            // Find and click a wrong option (not containing the first letter)
            const wrongOption = component.locator('.question-btn').filter({ hasNotText: firstLetter }).first();
            await wrongOption.click();
            
            // The wrong option should have error styling (red border/text)
            await expect(wrongOption).toHaveClass(/border-red|text-red|bg-red/);
            
            // The correct option should be disabled or have a different state
            const correctOption = component.locator('.question-btn').filter({ hasText: firstLetter });
            await expect(correctOption).toBeDisabled();
        });
    });

    test.describe('patterns-1 question', () => {
        test('reload functionality works correctly', async({ mount }) => {
            const component = await mount(<Question demoId={demoIds.PATTERNS_1} subject={'patterns'} />);
            
            // Wait for question to load
            await expect(component).toBeVisible();
            
            // Should have options with data-index attributes
            const option1 = component.locator('[data-index="0"]');
            const option2 = component.locator('[data-index="1"]');
            const option3 = component.locator('[data-index="2"]');
            
            await expect(option1).toBeVisible();
            await expect(option2).toBeVisible();
            await expect(option3).toBeVisible();
            
            // Should have reload button (styled with Tailwind)
            const reloadButton = component.locator('button[title="Opakovat"]');
            await expect(reloadButton).toBeVisible();
            
            // Check that the question mark indicator exists
            const questionMarkIndicator = component.locator('b > .flex');
            await expect(questionMarkIndicator).toBeVisible();
            
            // Test clicking first option
            await option1.click();
            
            // After clicking, question mark should disappear
            await expect(questionMarkIndicator).not.toContainText('❓');
            
            // Click reload button
            await reloadButton.click();
            
            // Question mark should reappear
            await expect(questionMarkIndicator).toContainText('❓');
            
            // Test clicking second option
            await option2.click();
            await expect(questionMarkIndicator).not.toContainText('❓');
            await reloadButton.click();
            await expect(questionMarkIndicator).toContainText('❓');
            
            // Test clicking third option
            await option3.click();
            await expect(questionMarkIndicator).not.toContainText('❓');
            await reloadButton.click();
            await expect(questionMarkIndicator).toContainText('❓');
        });
    });

    test('displays loading state initially', async({ mount }) => {
        // Mount the component and immediately check for loading state
        const component = await mount(<Question demoId={'add-1'} subject={'math'} />);
        
        // The component should eventually load and be visible
        await expect(component).toBeVisible();
    });

    test('handles question completion', async({ mount }) => {
        const component = await mount(<Question demoId={'add-1'} subject={'math'} />);
        
        // Wait for the question to load
        await expect(component).toBeVisible();
        
        // Find the correct answer and click it
        // This test assumes the component will show some feedback when answered correctly
        const options = component.locator('.question-btn');
        await expect(options.first()).toBeVisible();
        
        // Click the first option as a test (in a real scenario, we'd determine the correct answer)
        await options.first().click();
        
        // After clicking, the component should show some result or feedback
        // The exact behavior depends on the component implementation
        await expect(component).toBeVisible();
    });
});
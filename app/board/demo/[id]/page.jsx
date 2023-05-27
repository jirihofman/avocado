'use client';
import Board from '../../../../components/board';
import DefaultErrorPage from 'next/error';

export default function Exercise({ params: { id: demoId }}) {

    let notes, subject;

    switch (demoId) {
        case 'add-1':
            // subtitle = 'Sčítání jednociferných čísel';
            notes = 'Vždy existiuje právě jedna správná odpověď.';
            subject = 'Matematika';
            break;
        case 'multiply-1':
            // subtitle = 'Malá násobilka';
            notes = 'Vždy existiuje právě jedna správná odpověď.';
            subject = 'Matematika';
            break;
        case 'dice-add-1':
            // subtitle = 'Kostky';
            subject = 'Hry';
            break;
        case 'dice-larger-1':
            // subtitle = 'Kostky';
            subject = 'Hry';
            break;
        case 'capitals-1':
            // subtitle = 'Hlavní města';
            subject = 'Zeměpis';
            break;
	
        default:
            console.error('Unknown demo:' + demoId);
            return <DefaultErrorPage statusCode={404} />;
    }

    return (
        <>
            <Board
                subject={subject}
                demoId={demoId}
                notes={notes}
            />
        </>
    );
}

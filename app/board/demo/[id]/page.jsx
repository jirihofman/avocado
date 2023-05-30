'use client';
import Board from '../../../../components/board';
import DefaultErrorPage from 'next/error';

export default function Exercise({ params: { id: demoId }}) {

    let notes, subject;

    switch (demoId) {
        case 'add-1':
            notes = 'Vždy existiuje právě jedna správná odpověď.';
            subject = 'Matematika';
            break;
        case 'multiply-1':
            notes = 'Vždy existiuje právě jedna správná odpověď.';
            subject = 'Matematika';
            break;
        case 'dice-add-1':
            subject = 'Hry';
            break;
        case 'dice-larger-1':
            // notes = 'Které číslo je větší?';
            subject = 'Hry';
            break;
        case 'larger-1':
            // notes = 'Sečti kosty';
            subject = 'Matematika';
            break;
        case 'capitals-1':
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

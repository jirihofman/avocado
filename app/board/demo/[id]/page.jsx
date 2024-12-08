'use client';;
import { use } from "react";
import Board from '../../../../components/board';
import DefaultErrorPage from 'next/error';
import { demoIds } from '../../../../lib/questions';

export default function Exercise(props) {
    const params = use(props.params);

    const {
        id: demoId
    } = params;

    let notes, subject;

    switch (demoId) {
        case demoIds.ADD_1:
            notes = 'Vždy existiuje právě jedna správná odpověď.';
            subject = 'Matematika';
            break;
        case demoIds.MULTIPLY_1:
            notes = 'Vždy existiuje právě jedna správná odpověď.';
            subject = 'Matematika';
            break;
        case demoIds.DICE_ADD_1:
            subject = 'Hry';
            break;
        case demoIds.DICE_LARGER_1:
            // notes = 'Které číslo je větší?';
            subject = 'Hry';
            break;
        case demoIds.DICE_KARAK_1:
            subject = 'Deskové hry';
            break;
        case demoIds.CHESS_1:

            subject = 'Šachy';
            break;
        case demoIds.LARGER_1:
            subject = 'Matematika';
            break;
        case demoIds.LARGER_2:
            subject = 'Matematika';
            break;
        case demoIds.LARGER_3:
            subject = 'Matematika';
            break;
        case demoIds.NEXT_NUMBER_1:
            subject = 'Matematika';
            break;
        case demoIds.CAPITALS_1:
            subject = 'Zeměpis';
            break;
        case demoIds.WORDS_1:
            subject = 'Slova';
            break;
        case demoIds.PATTERNS_1:
            subject = 'Doplňování';
            break;
        case demoIds.TV_1:
            subject = 'Televize';
            break;
	
        default:
            if (!demoIds[demoId]) {
                console.error('Unknown demo:' + demoId);
                return <DefaultErrorPage statusCode={404} />;
            }
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

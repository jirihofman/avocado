import { parseISO, format } from 'date-fns';
import { cs } from 'date-fns/locale';

// TODO: get rid of date-fns
export default function Date({ dateString }) {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy', { locale: cs })}</time>;
}

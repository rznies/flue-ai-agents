'use agent';
import { useModel, usePersistentState, useTool } from '@flue/runtime';
import * as v from 'valibot';
import { MEETING_DAYS, type Meeting } from '../data/catalog.ts';
import { getCaseStudies, getPricing } from '../tools/sales.ts';

// Pulse is a sales assistant for Pulseboard, a fictional website-analytics
// SaaS for freelancers and studios. Bookings persist in durable
// per-conversation state, so a lead can book, then change or cancel later
// in the same conversation — even across restarts.
export function Sales() {
	useModel('google/gemini-3.6-flash');
	useTool(getPricing);
	useTool(getCaseStudies);

	const [meetings, setMeetings] = usePersistentState<Meeting[]>('meetings', []);

	useTool({
		name: 'book_meeting',
		description:
			'Book a 30-minute discovery call. Only call it after the user has given a name, an email address, a day (tue/wed/thu), and a time (10:00 or 15:00 UTC). Never invent these details — ask for any that are missing. Returns a booking reference.',
		input: v.object({
			name: v.string('A name is required to book.'),
			email: v.pipe(v.string('An email is required to book.'), v.email('That email does not look valid.')),
			day: v.picklist([...MEETING_DAYS], 'Day must be tue, wed, or thu.'),
			time: v.picklist(['10:00', '15:00'], 'Time must be 10:00 or 15:00 UTC.'),
		}),
		async run({ data }) {
			const reference = `PB-${Date.now().toString(36).toUpperCase()}`;
			const meeting: Meeting = {
				reference,
				name: data.name,
				email: data.email,
				day: data.day,
				time: data.time,
				timezoneNote: 'All times are UTC.',
			};
			setMeetings((previous) => [...previous, meeting]);
			return {
				output: {
					booking: meeting,
					totalBookings: meetings.length + 1,
				},
			};
		},
	});

	const booked = meetings.length > 0 ? ` Booked so far in this conversation: ${meetings.map((m) => `${m.reference} (${m.day} ${m.time} UTC for ${m.name})`).join('; ')}.` : '';

	return (
		'You are Pulse, the sales assistant for Pulseboard (website analytics for freelancers and studios). ' +
		'Qualify every lead with short questions: their role, how many sites they run, and monthly traffic. ' +
		'Answer pricing questions with get_pricing, back claims up with get_case_studies, and offer a discovery call once they show interest. ' +
		'To book, collect name, email, day (Tue–Thu), and time (10:00 or 15:00 UTC) first — then call book_meeting exactly once. ' +
		'Keep replies short (under 80 words unless listing tiers). Never invent prices, customers, or bookings.' +
		booked
	);
}

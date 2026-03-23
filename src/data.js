export const clubs = [
    {
        id: 'next-gen',
        title: 'Next Gen Coders',
        description: 'Empowering students through cutting-edge technologies like Web3, AI, and Cloud.',
        color: 'from-blue-600 to-cyan-500',
        image: '/logos/next gen coders logo.png'
    },
    {
        id: 'beyond-coders',
        title: 'Beyond The Coders',
        description: 'Exploring the intersection of technology, design, product management, and beyond.',
        color: 'from-purple-600 to-pink-500',
        image: '/logos/beyond the coders logo.png'
    }
];

export const eventsData = {
    'next-gen': [
        {
            id: '404-human-not-found',
            title: '404 Human Not Found',
            shortDescription: 'A unique coding and puzzle challenge.',
            description: 'Navigate through a series of logical puzzles and coding challenges where thinking like a machine is the only way out.',
            rules: ['Maximum 2 members per team', 'No external help', 'Fastest completion wins'],
            date: '18 March 2026',
            time: '01:30 PM – 03:30 PM',
            venue: 'Seminar Hall',
            eligibility: 'All students',
            image: '/logos/404 human not found.png',
            rulesDocument: '/eventrules/404 human not found.jpeg'
        },
        {
            id: 'snap-ai',
            title: 'Snap AI',
            shortDescription: 'AI image generation contest.',
            description: 'Use your prompt engineering skills to create the most stunning and accurate images based on hidden prompts.',
            rules: ['Individual participation', 'Specific tools will be provided', 'Time limit: 60 minutes'],
            date: '19 March 2026',
            time: '01:30 PM – 03:30 PM',
            venue: 'Computer Lab 3',
            eligibility: 'All students',
            image: '/logos/snap AI.png',
            rulesDocument: '/eventrules/snap AI.jpeg'
        }
    ],
    'beyond-coders': [
        {
            id: 'wealth-out-of-waste',
            title: 'Wealth Out of Waste',
            shortDescription: 'Create useful products from discarded materials.',
            description: 'Showcase your creativity and environmental consciousness by turning waste materials into valuable wealth.',
            rules: ['Bring your own waste materials', 'No pre-made items', 'Time limit: 2 hours'],
            date: '16 March 2026',
            time: '01:30 PM – 03:30 PM',
            venue: 'Quadrangle',
            eligibility: 'All students',
            image: '/logos/wealth out of waste.png',
            rulesDocument: '/eventrules/wealth out of waste.png'
        },
        {
            id: 'folk-dance',
            title: 'Folk Dance',
            shortDescription: 'Celebrate culture through traditional dance.',
            description: 'Bring the stage to life with energetic and synchronized traditional folk dance performances.',
            rules: [
                'Dancing time: 2 to 3 minutes',
                'Only traditional wear is allowed',
                'Members per team: 2 to 3 participants',
                'Theme: Folk based dance performance',
                'Decision of the judges will be final'
            ],
            date: '19 March 2026',
            time: '01:30 PM – 03:30 PM',
            venue: 'Open Air Theatre',
            eligibility: 'All students',
            image: '/logos/fork dance.png'
        }
    ]
};

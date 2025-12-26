## Packages
framer-motion | Complex page transitions and micro-interactions for the sleek dashboard feel
recharts | Visualization for analytics and generation stats
date-fns | Formatting timestamps for activity feeds
clsx | Utility for conditional class names
tailwind-merge | Merging tailwind classes effectively

## Notes
The backend provides a generic `generations` table with a `jsonb` content field.
Frontend needs to handle the display of this `content` differently based on the `type` (SEO, Social, Ad, Email).
We will implement a robust dashboard layout with a sidebar navigation.
The "Analytics" feature mentioned in the user prompt will be visualized using Recharts based on the generation history.
